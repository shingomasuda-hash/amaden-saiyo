#!/bin/sh
# 本番ビルドを再起動して測定できる状態にする
cd /home/user/amaden-saiyo
for p in $(pgrep -f next-server); do kill "$p" 2>/dev/null; done
sleep 2
nohup npx next start -p 3000 > /tmp/amaden-server.log 2>&1 &
until curl -sf -o /dev/null http://127.0.0.1:3000/; do sleep 1; done
echo "server up"
