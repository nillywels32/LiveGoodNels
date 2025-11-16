# 🌿 GoodLifeNels

**AI-Powered Family Nutrition Planning**

An intelligent meal planning app built on the "Go Back to Nature" philosophy, designed to help families embrace vibrant, nature-based nutrition through proactive AI engagement and adaptive learning.

[![License](https://img.shields.io/badge/license-Private-blue.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.2-blue.svg)](https://www.typescriptlang.org/)
[![React Native](https://img.shields.io/badge/React%20Native-0.76-61dafb.svg)](https://reactnative.dev/)
[![Next.js](https://img.shields.io/badge/Next.js-14-black.svg)](https://nextjs.org/)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E.svg)](https://supabase.com/)

---

## 📖 Overview

GoodLifeNels is a comprehensive nutrition planning platform that:

- **Plans Weekly Meals** - AI-generated 7-day meal plans tailored to your family
- **Manages Shopping** - Auto-generated shopping lists organized by store
- **Tracks Inventory** - Monitor ingredients and expiration dates
- **Engages Daily** - Proactive check-ins and smart suggestions
- **Adapts for Kids** - Creative solutions for picky eaters (ages 2-3)
- **Integrates with Apple** - Syncs with Calendar, Reminders, and Lists

### Philosophy: "Go Back to Nature"

- Whole foods first (plant-based, organic, non-GMO)
- Daily cold-pressed juice
- Top 15 essential superfoods rotation
- Zero refined sugars/carbs
- Gut health focus
- Quality protein for active lifestyles

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm 9+
- Supabase CLI
- Expo CLI (for mobile)

### Installation

```bash
# Clone repository
git clone https://github.com/nillywels32/LiveGoodNels.git
cd LiveGoodNels

# Install dependencies
npm install

# Set up environment
cp .env.example .env.local
# Edit .env.local with your API keys

# Start local Supabase
supabase start
supabase db reset

# Run web app
cd apps/web && npm run dev

# Run mobile app (in another terminal)
cd apps/mobile && npm start
```

**Full setup guide:** See [SETUP_INSTRUCTIONS.md](SETUP_INSTRUCTIONS.md)

---

## 🏗️ Project Structure

```
LiveGoodNels/
├── apps/
│   ├── mobile/          # React Native iOS app (Expo)
│   └── web/             # Next.js web app
├── packages/
│   ├── types/           # Shared TypeScript types
│   ├── ui/              # Shared UI components (coming soon)
│   └── api-client/      # Supabase wrapper (coming soon)
├── supabase/
│   ├── migrations/      # Database schema
│   └── functions/       # AI Edge Functions (Claude)
├── docs/                # Documentation
│   ├── PRD.md
│   ├── TECHNICAL_SPEC.md
│   ├── DATABASE_SCHEMA.md
│   ├── DEVELOPMENT_PHASES.md
│   ├── AI_PROMPT_LIBRARY.md
│   └── WIREFRAME_DESCRIPTIONS.md
└── scripts/             # Build/deployment scripts
```

---

## 🛠️ Tech Stack

### Frontend
- **Mobile:** React Native 0.76 + Expo 52
- **Web:** Next.js 14 (App Router) + React 18
- **UI:** React Native Paper (mobile), Tailwind CSS (web)
- **State:** Zustand + React Query
- **Forms:** React Hook Form

### Backend
- **Database:** PostgreSQL 15 (Supabase)
- **Auth:** Supabase Auth
- **Functions:** Supabase Edge Functions (Deno)
- **Storage:** Supabase Storage

### AI
- **Provider:** Anthropic
- **Model:** Claude Sonnet 4.5
- **Functions:** Meal planning, alternatives, check-ins, kid adaptations

### Integrations
- Apple Calendar (EventKit)
- Apple Reminders (EventKit)
- Push Notifications (Expo)

---

## 📱 Features

### ✅ Implemented (Phase 0)
- Project structure and monorepo setup
- Database schema with 16 tables
- AI Edge Functions (meal planning, Plan B, check-ins, kid adaptations)
- Mobile app with tab navigation
- Web app with sidebar navigation
- Shared TypeScript types
- Complete documentation

### 🔜 In Development (Phase 1)
- [ ] Authentication flow
- [ ] Weekly questionnaire
- [ ] AI meal plan generation UI
- [ ] Meal plan display
- [ ] Recipe details

### 🎯 Planned
- Shopping list management
- Inventory tracking
- Daily notifications
- Apple ecosystem integration
- Feedback and learning system
- Progress tracking

See [DEVELOPMENT_PHASES.md](docs/DEVELOPMENT_PHASES.md) for complete roadmap.

---

## 🎨 Design

### Brand Colors

```css
/* Primary */
--deep-forest-green: #2C5F2D;
--ocean-blue: #1B4965;
--earth-brown: #8B4513;

/* Accent */
--vibrant-lime: #9ACD32;
--sunset-orange: #FF8C42;
--berry-purple: #6A4C93;
```

### Top 15 Essential Foods

1. Broccoli sprouts
2. Turmeric
3. Blueberries
4. Broccoli
5. Flaxseed
6. Dark leafy greens
7. Garlic
8. Mushrooms (chaga)
9. Cacao
10. Tigernuts
11. Ginger root
12. Grapes (red)
13. Tomatoes
14. Lemon
15. Quinoa

---

## 📚 Documentation

- **[PRD.md](docs/PRD.md)** - Product Requirements Document
- **[TECHNICAL_SPEC.md](docs/TECHNICAL_SPEC.md)** - Technical Specification
- **[DATABASE_SCHEMA.md](docs/DATABASE_SCHEMA.md)** - Database Design
- **[DEVELOPMENT_PHASES.md](docs/DEVELOPMENT_PHASES.md)** - Development Roadmap
- **[AI_PROMPT_LIBRARY.md](docs/AI_PROMPT_LIBRARY.md)** - AI Prompts & Templates
- **[WIREFRAME_DESCRIPTIONS.md](docs/WIREFRAME_DESCRIPTIONS.md)** - UI/UX Designs
- **[SETUP_INSTRUCTIONS.md](SETUP_INSTRUCTIONS.md)** - Complete Setup Guide
- **[PROJECT_STATUS.md](PROJECT_STATUS.md)** - Current Status

---

## 🤝 Contributing

This is a private family project. If you're interested in building something similar:

1. Fork the repository
2. Review the documentation
3. Adapt for your own family's needs

---

## 📝 Development

### Commands

```bash
# Install dependencies
npm install

# Development
npm run dev:web        # Start web app
npm run dev:mobile     # Start mobile app

# Database
supabase start         # Start local Supabase
supabase db reset      # Reset and migrate
supabase db push       # Push to production

# Edge Functions
supabase functions serve    # Test locally
supabase functions deploy   # Deploy to production

# Type checking
npm run type-check

# Linting
npm run lint

# Formatting
npm run format
```

### Environment Variables

Required:
- `NEXT_PUBLIC_SUPABASE_URL` - Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anonymous key
- `SUPABASE_SERVICE_ROLE_KEY` - Supabase service role key
- `ANTHROPIC_API_KEY` - Anthropic Claude API key

See `.env.example` for complete list.

---

## 💰 Cost Estimate

- **Supabase Free Tier:** $0/month (sufficient for family use)
- **Anthropic Claude API:** ~$6-8/month
- **Apple Developer:** $99/year (for App Store distribution)

**Total: ~$6-8/month**

---

## 🗺️ Roadmap

- **Phase 0:** ✅ Foundation (COMPLETE)
- **Phase 1:** 🔜 Core Meal Planning (3 weeks)
- **Phase 2:** Shopping & Inventory (2 weeks)
- **Phase 3:** Daily Engagement (2 weeks)
- **Phase 4:** Apple Integration (2 weeks)
- **Phase 5:** Learning & Feedback (1.5 weeks)
- **Phase 6:** Polish & Optimization (1.5 weeks)
- **Phase 7:** Launch (1 week)

**Total Timeline:** 12-16 weeks to MVP

---

## 📄 License

Private - Family Use Only

---

## 🙏 Acknowledgments

Built with:
- [Supabase](https://supabase.com) - Backend infrastructure
- [Anthropic Claude](https://anthropic.com) - AI meal planning
- [Next.js](https://nextjs.org) - Web framework
- [Expo](https://expo.dev) - Mobile framework
- [React Native Paper](https://callstack.github.io/react-native-paper/) - Mobile UI

---

**Made with ❤️ for the Nels Family** 🌿
