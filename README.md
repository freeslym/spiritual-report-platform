# 身心灵报告平台 (Spiritual Trinity Platform)

高阶身心灵复合报告平台，为用户提供极度个性化的深度身心灵解析。通过一次信息输入，打通人类图、占星、基因天命三大体系，生成关联互通的数字化报告。

## 核心功能

- 🌟 **占星报告 (Astrology)**: 详细解析本命盘、太阳/月亮/上升星座的深层驱力
- ◎ **人类图 (Human Design)**: 解析四大类型、九大中心、内生权威和通道
- ✧ **基因天命 (Gene Keys)**: 根据占星的太阳/地球落点，映射到特定的基因天命

## 技术栈

- **框架**: Next.js 14 (App Router)
- **样式**: Tailwind CSS
- **数据库**: PostgreSQL + Prisma ORM + Supabase
- **支付**: Stripe
- **AI**: Claude 3.5 / GPT-4 (多模型路由)
- **天文计算**: Swiss Ephemeris

## 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 配置环境变量

```bash
cp .env.example .env.local
# 然后编辑 .env.local 填入你的API密钥
```

### 3. 设置数据库

```bash
npx prisma generate
npx prisma db push
```

### 4. 运行开发服务器

```bash
npm run dev
```

打开 [http://localhost:3000](http://localhost:3000) 查看应用。

## 项目结构

```
├── app/
│   ├── api/
│   │   ├── birth/          # 出生信息录入API
│   │   ├── checkout/        # Stripe支付API
│   │   └── webhook/stripe/  # Stripe webhook处理
│   ├── result/              # 免费结果页
│   ├── report/              # 报告详情页
│   └── page.tsx             # 首页
├── lib/
│   ├── astrology.ts         # 占星计算引擎
│   └── prisma.ts            # Prisma客户端
├── prisma/
│   └── schema.prisma        # 数据库Schema
└── public/                  # 静态资源
```

## 商业模式

- **Freemium**: 基础星盘图表免费查看
- **付费报告**: 
  - 单项报告: $19.99
  - 全套Trinity报告: $39.99

## License

MIT
