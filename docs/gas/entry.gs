/**
 * Amaden 採用LP 応募フォーム受け口（Google Apps Script Web アプリ）
 *
 * やること
 *   1. スプレッドシートに1行追記（これまで通りスプシで管理できる）
 *   2. 担当者へ完了メールを送信
 *   2-2. 応募者へ自動返信メールを送信
 *   3. Drive のバックアップフォルダに JSON を1件ずつ保存（バックアップ）
 *
 * 設定はすべてこのファイル冒頭の「設定」ブロックに集約してある。
 * 貼り付け後に書き換えるのは RECIPIENTS の1行だけ。
 * 設置手順は docs/entry-form-setup.md を参照。
 */

// ---- 設定 -------------------------------------------------------------

/**
 * 完了メールの宛先。
 * ここだけ、採用担当3名のメールアドレスに書き換えてください。
 * （リポジトリに個人のアドレスを残さないため空のままにしてあります）
 */
var RECIPIENTS = [
  '',
  '',
  '',
];

/**
 * 合言葉。デプロイURLを知った第三者からの投稿を弾くためのもの。
 * Vercel の環境変数 ENTRY_WEBHOOK_TOKEN に同じ文字列を設定する。
 */
var TOKEN = 'a9nchclOxPyS2vzssTT6DZHhPYeT3UgkvtNTeILe';

/** 書き込むシート名（無ければ自動で作成する） */
var SHEET_NAME = '応募一覧';

/** バックアップ先の Drive フォルダ名（無ければ自動で作成する） */
var BACKUP_FOLDER_NAME = 'Amaden採用LP 応募バックアップ';

/** 応募者への自動返信の送信者名。返信先は RECIPIENTS の1番目を使う。 */
var SENDER_NAME = '株式会社Amaden 採用担当';

/** 自動返信メールの署名 */
var SIGNATURE = [
  '──────────────────────',
  '株式会社Amaden',
  '〒660-0087 兵庫県尼崎市平左衛門町18-26',
  'TEL 06-6415-9623 / FAX 06-6415-9624',
  '──────────────────────',
].join('\n');

/** メール件名（受信箱で誰からの応募か一目で分かるよう氏名を入れる） */
function subject_(name) {
  return '【応募】' + (name || '氏名未記入') + 'さん｜Amaden採用サイト';
}

/** バックアップファイル名 */
function backupName_(received, name) {
  return Utilities.formatDate(received, 'Asia/Tokyo', 'yyyyMMdd-HHmmss')
    + '_' + (name || '氏名未記入') + '.json';
}

// ---- 本体 -------------------------------------------------------------

var HEADERS = ['受信日時', 'ご希望', 'お名前', 'メールアドレス', '生年月日', '電話番号', '備考', 'User-Agent', '参照元'];

function doPost(e) {
  try {
    if (!e || !e.postData) {
      // エディタの「実行」ボタンから直接呼ばれた場合。
      // 動作確認は testRun() を実行してください。
      return json_({ ok: false, message: 'このURLにPOSTしてください（動作確認は testRun）' });
    }
    var data = JSON.parse(e.postData.contents);

    if (TOKEN && data.token !== TOKEN) {
      return json_({ ok: false, message: 'unauthorized' });
    }

    var received = data.submittedAt ? new Date(data.submittedAt) : new Date();
    var row = [
      Utilities.formatDate(received, 'Asia/Tokyo', 'yyyy/MM/dd HH:mm:ss'),
      data.purpose || '',
      data.name || '',
      data.email || '',
      data.birthday || '',
      data.tel || '',
      data.note || '（未入力）',
      data.userAgent || '',
      data.referer || '',
    ];

    appendRow_(row);
    saveBackup_(received, data);
    sendMail_(row);

    // 自動返信が失敗しても、記録と担当者通知は成立させる
    try {
      sendAutoReply_(row);
    } catch (mailErr) {
      console.error('自動返信の送信に失敗しました', mailErr);
    }

    return json_({ ok: true });
  } catch (err) {
    // 失敗しても応募内容が消えないよう、実行ログに生データを残す
    console.error(err, e && e.postData ? e.postData.contents : '');
    return json_({ ok: false, message: String(err) });
  }
}

/**
 * 動作確認用。エディタ上部で testRun を選んで「実行」すると、
 * テストの1件がシート・メール・Drive に流れるので設定を確認できる。
 * 確認後、シートの行は手で削除してください。
 */
function testRun() {
  var received = new Date();
  var row = [
    Utilities.formatDate(received, 'Asia/Tokyo', 'yyyy/MM/dd HH:mm:ss'),
    '応募を希望',
    'テスト太郎',
    'test@example.com',
    '1995年6月1日',
    '09000000000',
    'これは動作確認用のテスト送信です。',
    'testRun',
    '',
  ];
  appendRow_(row);
  saveBackup_(received, { name: row[2], note: row[6], test: true });
  sendMail_(row);
  // 応募者への自動返信を自分宛に送って内容を確認する
  row[3] = Session.getActiveUser().getEmail() || row[3];
  sendAutoReply_(row);
  console.log('テスト送信しました。シート・メール（担当者宛と自動返信）・Drive を確認してください。');
}

/** 動作確認用（ブラウザでデプロイ URL を開くと OK が出る） */
function doGet() {
  return ContentService.createTextOutput('OK');
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

function appendRow_(row) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  }
  if (sheet.getLastRow() === 0) {
    writeHeader_(sheet);
  } else if (sheet.getRange(1, 1, 1, HEADERS.length).getValues()[0].join('\t') !== HEADERS.join('\t')) {
    // 列構成を変えたあとでも見出しが合うように書き直す
    writeHeader_(sheet);
  }
  sheet.appendRow(row);
}

function writeHeader_(sheet) {
  sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]).setFontWeight('bold');
  sheet.setFrozenRows(1);
}

/** 1件ごとに JSON を Drive へ保存しておく（スプシが壊れても復元できる） */
function saveBackup_(received, data) {
  var folders = DriveApp.getFoldersByName(BACKUP_FOLDER_NAME);
  var folder = folders.hasNext() ? folders.next() : DriveApp.createFolder(BACKUP_FOLDER_NAME);
  folder.createFile(backupName_(received, data.name), JSON.stringify(data, null, 2), MimeType.PLAIN_TEXT);
}

/** 応募者本人への自動返信 */
function sendAutoReply_(row) {
  var to = row[3];
  if (!to) return;

  var recipients = RECIPIENTS.filter(function (v) { return v && v.trim(); });
  var body = [
    row[2] + ' 様',
    '',
    'このたびは株式会社Amadenの採用サイトよりご応募いただき、',
    '誠にありがとうございます。',
    '下記の内容で応募を受け付けいたしました。',
    '',
    '──────────────────────',
    'ご希望：' + row[1],
    'お名前：' + row[2],
    'メールアドレス：' + row[3],
    '生年月日：' + row[4],
    '電話番号：' + row[5],
    '備考：',
    row[6],
    '──────────────────────',
    '',
    '内容を確認のうえ、採用担当よりあらためてご連絡いたします。',
    '今しばらくお待ちくださいますようお願いいたします。',
    '',
    '※本メールは自動送信です。ご返信いただいてもお答えできません。',
    '　お急ぎの場合はお電話にてお問い合わせください。',
    '',
    SIGNATURE,
  ].join('\n');

  var options = {
    to: to,
    subject: '【ご応募ありがとうございます】株式会社Amaden 採用担当',
    body: body,
    name: SENDER_NAME,
  };
  if (recipients.length) options.replyTo = recipients[0];

  MailApp.sendEmail(options);
}

function sendMail_(row) {
  var recipients = RECIPIENTS.filter(function (v) { return v && v.trim(); });
  if (!recipients.length) {
    console.warn('RECIPIENTS が未設定のためメールを送信しませんでした。');
    return;
  }
  var lines = [];
  for (var i = 0; i < HEADERS.length; i++) {
    lines.push(HEADERS[i] + '：' + row[i]);
  }
  var body = [
    'Amaden採用サイトの応募フォームから、新しい応募がありました。',
    '',
    lines.join('\n'),
    '',
    '------------------------------',
    'スプレッドシート：' + SpreadsheetApp.getActiveSpreadsheet().getUrl(),
  ].join('\n');

  MailApp.sendEmail({
    to: recipients.join(','),
    subject: subject_(row[2]),
    body: body,
  });
}
