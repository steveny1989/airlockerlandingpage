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
# 询问一次避免误操作（非交互环境下自动继续）
CONFIRM="y"
if [ -t 0 ]; then
  CONFIRM="n"
  read -p "Commit and push with message: \"$MSG\" ? [y/N] " CONFIRM || true
fi
if [[ "$CONFIRM" != "y" && "$CONFIRM" != "Y" ]]; then
  echo "Canceled."
  exit 0
fi
git add .
git commit -m "$MSG" || echo "Nothing to commit."
git branch -M main
echo "Pulling latest changes from remote..."
git pull --rebase origin main || {
  echo "⚠️ git pull --rebase 失败，请手动处理冲突后再运行本脚本。"
  exit 1
}
git push -u origin main
echo "✅ Deployed to GitHub."
