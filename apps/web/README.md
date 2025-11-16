# GoodLifeNels Web App

The Next.js web application for GoodLifeNels - an AI-powered family nutrition planning app built on the "Go Back to Nature" philosophy.

## Overview

This web app provides a desktop/browser experience for families to:
- Complete weekly nutrition questionnaires
- View AI-generated meal plans
- Manage shopping lists and inventory
- Track nutrition progress and meal feedback
- Manage family profiles and preferences

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 (custom brand colors)
- **State**: Zustand + React Query
- **Backend**: Supabase (PostgreSQL + Auth)
- **AI**: Anthropic Claude Sonnet 4.5
- **Forms**: React Hook Form
- **Animations**: Framer Motion

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your Supabase and Anthropic credentials
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
apps/web/
├── app/                    # Next.js pages (App Router)
│   ├── layout.tsx         # Root layout with sidebar
│   ├── page.tsx           # Home dashboard
│   ├── plan/              # Meal planning
│   ├── shop/              # Shopping & inventory
│   ├── track/             # Progress tracking
│   └── settings/          # User settings
├── components/
│   ├── layout/            # Sidebar, navigation
│   └── ui/                # Reusable components
├── lib/
│   ├── supabase/          # Supabase client config
│   └── providers/         # React providers
├── stores/                # Zustand state stores
├── hooks/                 # Custom React hooks
└── styles/                # Global CSS
```

## Brand Colors

The app uses a nature-inspired color palette:

- **Deep Forest Green** (#2C5F2D) - Primary actions
- **Ocean Blue** (#1B4965) - Secondary actions
- **Vibrant Lime** (#9ACD32) - Success states
- **Earth Brown** (#8B4513) - Warm accents

All colors are defined as CSS custom properties in `app/globals.css`.

## Key Features (Implemented)

✅ Next.js 14 with TypeScript
✅ Tailwind CSS with custom brand colors
✅ Responsive sidebar navigation
✅ Placeholder pages for all main sections
✅ Supabase client configuration (client + server)
✅ Zustand stores for auth and UI state
✅ React Query provider setup
✅ Environment variable template

## Next Steps

See [SETUP.md](./SETUP.md) for detailed setup instructions.

Development roadmap:
1. Implement authentication flow
2. Build questionnaire component
3. Integrate AI meal plan generation
4. Create shopping list functionality
5. Add progress tracking features

## Documentation

- **Setup Guide**: [SETUP.md](./SETUP.md)
- **Technical Spec**: [../../docs/TECHNICAL_SPEC.md](../../docs/TECHNICAL_SPEC.md)
- **Database Schema**: [../../docs/DATABASE_SCHEMA.md](../../docs/DATABASE_SCHEMA.md)
- **Wireframes**: [../../docs/WIREFRAME_DESCRIPTIONS.md](../../docs/WIREFRAME_DESCRIPTIONS.md)

## License

Private - The Nels Family
