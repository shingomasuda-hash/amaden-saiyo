/**
 * Amaden 採用LP 応募フォーム受け口（Google Apps Script Web アプリ）
 *
 * やること
 *   1. スプレッドシートに1行追記（これまで通りスプシで管理できる）
 *   2. 担当者へ完了メールを送信
 *   3. Drive のバックアップフォルダに JSON を1件ずつ保存（バックアップ）
 *
 * 宛先・合言葉はコードに直接書かず、スクリプト プロパティから読む。
 * 設置手順は docs/entry-form-setup.md を参照。
 */

// ---- 設定 -------------------------------------------------------------

/** 書き込むシート名（無ければ自動で作成する） */
var SHEET_NAME = '応募一覧';

/** バックアップ先の Drive フォルダ名（無ければ自動で作成する） */
var BACKUP_FOLDER_NAME = 'Amaden採用LP 応募バックアップ';

/** メール件名（受信箱で誰からの応募か一目で分かるよう氏名を入れる） */
function subject_(name) {
  return '【応募】' + (name || '氏名未記入') + 'さん｜Amaden採用サイト';
}

/** バックアップファイル名 */
function backupName_(received, name) {
  return Utilities.formatDate(received, 'Asia/Tokyo', 'yyyyMMdd-HHmmss')
    + '_' + (name || '氏名未記入') + '.json';
}

/**
 * スクリプト プロパティから設定値を読む。
 *   RECIPIENTS : 完了メールの宛先（カンマ区切り）
 *   TOKEN      : Vercel の ENTRY_WEBHOOK_TOKEN と同じ文字列（空なら検証しない）
 */
function config_() {
  var p = PropertiesService.getScriptProperties();
  return {
    recipients: (p.getProperty('RECIPIENTS') || '')
      .split(',')
      .map(function (v) { return v.trim(); })
      .filter(function (v) { return v; }),
    token: p.getProperty('TOKEN') || '',
  };
}

// ---- 本体 -------------------------------------------------------------

var HEADERS = ['受信日時', 'お名前', 'メールアドレス', '生年月日', '電話番号', '備考', 'User-Agent', '参照元'];

function doPost(e) {
  try {
    var cfg = config_();
    var data = JSON.parse(e.postData.contents);

    if (cfg.token && data.token !== cfg.token) {
      return json_({ ok: false, message: 'unauthorized' });
    }

    var received = data.submittedAt ? new Date(data.submittedAt) : new Date();
    var row = [
      Utilities.formatDate(received, 'Asia/Tokyo', 'yyyy/MM/dd HH:mm:ss'),
      data.name || '',
      data.email || '',
      data.birthday || '',
      data.tel || '',
      data.note || '',
      data.userAgent || '',
      data.referer || '',
    ];

    appendRow_(row);
    saveBackup_(received, data);
    sendMail_(cfg.recipients, row);

    return json_({ ok: true });
  } catch (err) {
    // 失敗しても応募内容が消えないよう、実行ログに生データを残す
    console.error(err, e && e.postData ? e.postData.contents : '');
    return json_({ ok: false, message: String(err) });
  }
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
    sheet.appendRow(HEADERS);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
    sheet.setFrozenRows(1);
  }
  sheet.appendRow(row);
}

/** 1件ごとに JSON を Drive へ保存しておく（スプシが壊れても復元できる） */
function saveBackup_(received, data) {
  var folders = DriveApp.getFoldersByName(BACKUP_FOLDER_NAME);
  var folder = folders.hasNext() ? folders.next() : DriveApp.createFolder(BACKUP_FOLDER_NAME);
  folder.createFile(backupName_(received, data.name), JSON.stringify(data, null, 2), MimeType.PLAIN_TEXT);
}

function sendMail_(recipients, row) {
  if (!recipients.length) {
    console.warn('スクリプト プロパティ RECIPIENTS が未設定のためメールを送信しませんでした。');
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
    subject: subject_(row[1]),
    body: body,
  });
}
