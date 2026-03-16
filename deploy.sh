#!/usr/bin/env bash
set -e
# 用法：
#   ./deploy.sh "本次修改说明"
# 不写说明时，自动用当前时间
MSG="$1"
if [ -z "$MSG" ]; then
  MSG="Update site $(date '+%Y-%m-%d %H:%M:%S')"
fi
# 确保在 airlocker-landing 目录里
cd /Users/diyao/Arbitrator/airlocker-landing
# 确保 remote 正确
git remote set-url origin https://github.com/steveny1989/airlockerlandingpage.git
# 查看状态
git status
# 询问一次避免误操作（想直接干掉这段也行）
read -p "Commit and push with message: \"$MSG\" ? [y/N] " CONFIRM
if [[ "$CONFIRM" != "y" && "$CONFIRM" != "Y" ]]; then
  echo "Canceled."
  exit 0
fi
git add .
git commit -m "$MSG" || echo "Nothing to commit."
git branch -M main
git push -u origin main
echo "✅ Deployed to GitHub."
