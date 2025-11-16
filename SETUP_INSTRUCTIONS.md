# 🚀 GoodLifeNels Setup Instructions

## What Was Built

Your GoodLifeNels project has been **fully initialized** with all components ready for development! Here's what we created:

### ✅ Completed Components

1. **📦 Project Structure** - Monorepo with workspaces
2. **🎨 Shared TypeScript Types** - Complete type definitions
3. **🌐 Next.js Web App** - Full setup with Tailwind + Supabase
4. **📱 React Native Mobile App** - Expo setup with navigation
5. **🗄️ Supabase Backend** - Database schema + Edge Functions
6. **🤖 AI Integration** - Claude API Edge Functions

---

## Quick Start Guide

### Step 1: Install Dependencies

```bash
# Install root dependencies
npm install

# Install web app dependencies
cd apps/web
npm install

# Install mobile app dependencies
cd ../mobile
npm install

# Install types package dependencies
cd ../../packages/types
npm install

cd ../..
```

### Step 2: Set Up Supabase

#### Option A: Local Development (Recommended for Testing)

```bash
# Install Supabase CLI
npm install -g supabase

# Start local Supabase
supabase start

# Apply database migrations
supabase db reset

# Seed database with recipes
psql postgresql://postgres:postgres@127.0.0.1:54322/postgres < supabase/seed.sql

# Your local Supabase is now running!
# API URL: http://127.0.0.1:54321
# Studio: http://127.0.0.1:54323
```

#### Option B: Cloud Supabase (Production)

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Get your project URL and anon key from Settings → API
3. Run migrations:
   ```bash
   supabase link --project-ref your-project-ref
   supabase db push
   ```

### Step 3: Configure Environment Variables

```bash
# Copy environment template
cp .env.example .env.local

# Edit .env.local with your credentials
# - NEXT_PUBLIC_SUPABASE_URL (from Step 2)
# - NEXT_PUBLIC_SUPABASE_ANON_KEY (from Step 2)
# - SUPABASE_SERVICE_ROLE_KEY (from Step 2)
# - ANTHROPIC_API_KEY (get from console.anthropic.com)
```

### Step 4: Get Anthropic API Key

1. Go to [console.anthropic.com](https://console.anthropic.com)
2. Sign up/log in
3. Create a new API key
4. Copy the key to `.env.local` as `ANTHROPIC_API_KEY`

### Step 5: Deploy Edge Functions

```bash
# For local development
supabase functions serve --env-file .env.local

# For production (after linking project)
supabase functions deploy
```

### Step 6: Start Development Servers

```bash
# Start web app (in terminal 1)
cd apps/web
npm run dev
# Visit: http://localhost:3000

# Start mobile app (in terminal 2)
cd apps/mobile
npm start
# Scan QR code with Expo Go app
```

---

## What's Ready to Use

### ✅ Web App (apps/web/)
- **URL**: http://localhost:3000
- **Features**:
  - Home dashboard with placeholder
  - Meal planning section
  - Shopping list view
  - Progress tracking
  - Settings page
  - Supabase authentication ready
  - React Query configured
  - Tailwind with brand colors

### ✅ Mobile App (apps/mobile/)
- **Platform**: iOS (Android coming soon)
- **Features**:
  - Tab navigation (Home, Plan, Shop, Track)
  - React Native Paper UI
  - Supabase authentication ready
  - React Query configured
  - Brand colors applied
  - Calendar/Reminders ready (need permissions)

### ✅ Database (Supabase)
- **Tables**: 16 tables (users, meal_plans, recipes, etc.)
- **Seed Data**: 15 curated recipes
- **Functions**: 6 database functions + triggers
- **Security**: Row-level security on all tables

### ✅ AI Functions (Supabase Edge Functions)
- `generate-meal-plan` - Creates 7-day meal plans
- `generate-plan-b` - Alternative meal suggestions
- `daily-checkin` - Morning check-in messages
- `adapt-for-kids` - Kid-friendly recipe adaptations

---

## Next Development Steps

### Phase 1: Core Features (Week 1-3)

1. **Authentication Flow**
   - Build login/signup pages
   - Implement onboarding flow
   - Create family profile setup

2. **Questionnaire System**
   - Multi-step form component
   - Save responses to Supabase
   - Trigger meal plan generation

3. **Meal Plan Display**
   - Fetch and display generated plans
   - Day-by-day card view
   - Recipe detail modals

### Phase 2: Shopping & Inventory (Week 4-5)

1. **Shopping List**
   - Display auto-generated lists
   - Group by store
   - Check-off items

2. **Inventory Tracking**
   - Add/edit inventory items
   - Expiration tracking
   - Low stock alerts

### Phase 3: Daily Engagement (Week 6-7)

1. **Notifications**
   - Set up push notifications
   - Schedule Saturday questionnaire
   - Daily check-ins

2. **Plan B Feature**
   - "Don't want this meal" button
   - AI alternative generation
   - Swap meals

### Phase 4: Apple Integration (Week 8-9)

1. **Calendar Sync**
   - Meal prep events
   - User approval flow

2. **Reminders Sync**
   - Shopping reminders
   - Location-based alerts

---

## Troubleshooting

### "Module not found" errors
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### Supabase connection issues
```bash
# Check if Supabase is running
supabase status

# Restart if needed
supabase stop
supabase start
```

### Expo app not loading
```bash
# Clear cache
cd apps/mobile
npx expo start -c
```

### Edge Functions not working
```bash
# Check environment variables are set
# Make sure .env.local has ANTHROPIC_API_KEY

# Restart functions
supabase functions serve --env-file .env.local
```

---

## Project Structure

```
GoodLifeNels/
├── apps/
│   ├── mobile/          ✅ React Native app (Expo)
│   └── web/             ✅ Next.js web app
├── packages/
│   ├── types/           ✅ Shared TypeScript types
│   ├── ui/              🔜 Shared UI components (coming soon)
│   └── api-client/      🔜 Supabase wrapper (coming soon)
├── supabase/
│   ├── migrations/      ✅ Database schema
│   └── functions/       ✅ AI Edge Functions
├── docs/                ✅ All documentation
└── scripts/             🔜 Build scripts (coming soon)
```

---

## Resources

- **Documentation**: See `docs/` folder
  - [PRD.md](docs/PRD.md) - Product requirements
  - [TECHNICAL_SPEC.md](docs/TECHNICAL_SPEC.md) - Technical details
  - [DATABASE_SCHEMA.md](docs/DATABASE_SCHEMA.md) - Database design
  - [DEVELOPMENT_PHASES.md](docs/DEVELOPMENT_PHASES.md) - Development roadmap
  - [AI_PROMPT_LIBRARY.md](docs/AI_PROMPT_LIBRARY.md) - AI prompts
  - [WIREFRAME_DESCRIPTIONS.md](docs/WIREFRAME_DESCRIPTIONS.md) - UI designs

- **External Resources**:
  - [Supabase Docs](https://supabase.com/docs)
  - [Next.js Docs](https://nextjs.org/docs)
  - [Expo Docs](https://docs.expo.dev)
  - [Anthropic API Docs](https://docs.anthropic.com)

---

## Getting Help

If you encounter issues:

1. Check `supabase/README.md` for backend setup
2. Check `apps/web/README.md` for web app setup
3. Check `apps/mobile/README.md` for mobile app setup
4. Review `docs/DEVELOPMENT_PHASES.md` for implementation guidance

---

## What's Next?

You're now ready to start building features! Follow the development phases:

1. ✅ **Phase 0: Foundation** (COMPLETE)
2. 🔜 **Phase 1: Core Meal Planning** (3 weeks)
3. 🔜 **Phase 2: Shopping & Inventory** (2 weeks)
4. 🔜 **Phase 3: Daily Engagement** (2 weeks)
5. 🔜 **Phase 4: Apple Integration** (2 weeks)
6. 🔜 **Phase 5: Learning & Feedback** (1.5 weeks)
7. 🔜 **Phase 6: Polish** (1.5 weeks)
8. 🔜 **Phase 7: Launch** (1 week)

---

**Happy building! 🌿**
