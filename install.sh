#!/bin/bash
set -e

cd /root/.openclaw/workspace/spiritual-report-platform

# 安装依赖（使用国内镜像加速）
npm install --registry=https://registry.npmmirror.com

# 生成Prisma Client
npx prisma generate

# 构建项目
npm run build

echo "✅ 项目构建成功！"
echo "运行 'npm run dev' 启动开发服务器"
