# Trinity - Spiritual Report Platform

> Three ancient wisdom traditions. One unified digital experience.

## 🌟 Overview

A comprehensive spiritual report platform combining **Astrology**, **Human Design**, and **Gene Keys** into one unified digital experience.

### Features

- **Natal Chart Calculation** - Accurate planetary positions using Swiss Ephemeris
- **Human Design Analysis** - BodyGraph calculation and center identification
- **Gene Keys Mapping** - Activation journey from shadow to siddha
- **AI-Powered Reports** - Personalized interpretations using MiniMax M2.7
- **Free Preview** - 3-line personalized summary before payment
- **Freemium Model** - Free natal chart, paid in-depth reports
- **Mock Payment** - Test mode without requiring real Stripe

## 🚀 Tech Stack

- **Frontend**: Next.js 14 (App Router), React, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: SQLite with Prisma ORM
- **AI**: MiniMax M2.7
- **Payment**: Stripe (mock mode for testing)
- **Geocoding**: OpenStreetMap Nominatim (free, no API key)

## 🛠 Prerequisites

- Node.js 20+
- npm or yarn

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/spiritual-report-platform.git
cd spiritual-report-platform

# Install dependencies
npm install --registry=https://registry.npmmirror.com

# Generate Prisma Client
npx prisma generate

# Push database schema
npx prisma db push
```

## ⚙️ Environment Variables

Create a `.env.local` file:

```bash
NEXT_PUBLIC_APP_URL="http://localhost:3000"
DATABASE_URL="file:./dev.db"

# MiniMax API (for AI reports)
NEXT_PUBLIC_MINIMAX_API_KEY="your-minimax-api-key"

# Optional: For production payments
STRIPE_SECRET_KEY="sk_test_xxxx"
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_xxxx"
STRIPE_WEBHOOK_SECRET="whsec_xxxx"
```

## 🚀 Running Locally

```bash
# Development
npm run dev

# Production build
npm run build

# Start production server
npm start
```

Visit `http://localhost:3000`

## 📁 Project Structure

```
spiritual-report-platform/
├── app/
│   ├── api/
│   │   ├── birth/route.ts          # Birth info & natal chart
│   │   ├── checkout/route.ts       # Mock payment
│   │   └── webhook/stripe/route.ts # Webhook handler
│   ├── example/page.tsx            # Example report
│   ├── result/page.tsx             # Free results
│   ├── report/
│   │   ├── success/page.tsx        # Payment success
│   │   └── cancel/page.tsx         # Payment cancel
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── lib/
│   ├── astrology.ts                 # Calculation engine
│   └── prisma.ts                  # Prisma client
├── prisma/
│   ├── schema.prisma               # Database schema
│   └── schema.sqlite.prisma        # SQLite schema
└── public/
```

## 🎨 Design Features

- **Playfair Display** - Elegant serif font for headings
- **Glassmorphism** - Frosted glass effects with backdrop blur
- **Animated Background** - Gradient orbs and star fields
- **Mysterious Dark Theme** - Deep purple/pink cosmic aesthetic
- **Smooth Animations** - Framer Motion transitions
- **Responsive** - Mobile-first design

## 🧪 Development

### Database Operations

```bash
# Generate Prisma Client
npx prisma generate

# Push schema changes
npx prisma db push

# Open Prisma Studio
npx prisma studio
```

### Testing API Endpoints

```bash
# Test birth data calculation
curl -POST http://localhost:3000/api/birth \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "birthDate": "1990-06-15",
    "birthTime": "14:30",
    "birthCity": "San Francisco, CA",
    "latitude": 37.7749,
    "longitude": -122.4194,
    "timezone": "America/Los_Angeles"
  }'

# Test mock checkout
curl -POST http://localhost:3000/api/checkout \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "test_user",
    "productType": "bundle"
  }'
```

## 🚢 Deployment

### Vercel

1. Push code to GitHub
2. Connect repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy

Vercel will automatically:
- Install dependencies
- Run `npm run build`
- Start production server

## 📝 License

MIT

## 🤝 Support

For issues and questions, please open an issue on GitHub.

---

Built with ❤️ using Next.js, Tail CSS, and MiniMax
