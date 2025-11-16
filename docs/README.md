# 🌿 GoodLifeNels

AI-powered family nutrition planning app built on the "Go Back to Nature" philosophy.

## Project Structure

```
GoodLifeNels/
├── apps/
│   ├── mobile/          # React Native iOS app
│   └── web/             # Next.js web app
├── packages/
│   ├── ui/              # Shared UI components
│   ├── api-client/      # Supabase client wrapper
│   └── types/           # Shared TypeScript types
├── supabase/
│   ├── migrations/      # Database migrations
│   └── functions/       # Edge Functions (AI integration)
├── docs/                # Documentation (PRD, specs, etc.)
└── scripts/             # Build and deployment scripts
```

## Tech Stack

- **Mobile:** React Native + Expo
- **Web:** Next.js 14 (App Router)
- **Backend:** Supabase (PostgreSQL + Auth + Edge Functions)
- **AI:** Anthropic Claude Sonnet 4.5
- **State:** Zustand + React Query
- **UI:** React Native Paper (mobile) + shadcn/ui (web)

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+
- Supabase CLI
- Expo CLI (for mobile development)

### Installation

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your API keys

# Start development servers
npm run dev:web     # Web app (http://localhost:3000)
npm run dev:mobile  # Mobile app (Expo)
```

### Environment Variables

Required API keys:
- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anonymous key
- `SUPABASE_SERVICE_ROLE_KEY` - Supabase service role key
- `ANTHROPIC_API_KEY` - Anthropic Claude API key

## Development Phases

See [DEVELOPMENT_PHASES.md](docs/DEVELOPMENT_PHASES.md) for detailed roadmap.

**Current Phase:** Phase 0 - Foundation (Week 1)

## Documentation

- [Product Requirements](PRD.md)
- [Technical Specification](TECHNICAL_SPEC.md)
- [Database Schema](DATABASE_SCHEMA.md)
- [Development Phases](DEVELOPMENT_PHASES.md)
- [AI Prompt Library](AI_PROMPT_LIBRARY.md)
- [Wireframes](WIREFRAME_DESCRIPTIONS.md)

## License

Private - Family Use Only

---

Built with ❤️ for the Nels Family
