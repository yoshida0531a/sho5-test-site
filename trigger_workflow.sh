#!/bin/bash
# GitHub Workflow手動実行スクリプト

echo "ワークフローを手動実行するには、GitHubのWebページから実行してください："
echo ""
echo "1. https://github.com/yoshida0531a/sho5-test-site/actions"
echo "2. 左側の 'Update News with AI Summary' をクリック"
echo "3. 右側の 'Run workflow' ボタンをクリック"
echo "4. 'Run workflow' を確認してクリック"
echo ""
echo "または、以下のコマンドでGitHub CLIを設定後実行："
echo "gh auth login"
echo "gh workflow run \"Update News with AI Summary\""