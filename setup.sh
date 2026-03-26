#!/bin/bash
# 身心灵报告平台 - 一键启动脚本

set -e
cd /root/.openclaw/workspace/spiritual-report-platform

echo "🔮 开始安装身心灵报告平台..."

# 1. 安装依赖
echo "📦 安装依赖..."
npm install --registry=https://registry.npmmirror.com

# 2. 生成Prisma Client
echo "🗄️ 生成Prisma Client..."
npx prisma generate

# 3. 构建项目
echo "🏗️ 构建项目..."
npm run build

echo ""
echo "✅ 安装完成！"
echo ""
echo "启动开发服务器："
echo "  cd /root/.openclaw/workspace/spiritual-report-platform"
echo "  npm run dev"
echo ""
echo "访问 http://localhost:3000 查看应用"
