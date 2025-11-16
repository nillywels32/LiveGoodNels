# GoodLifeNels Web App Setup Guide

This is the Next.js web application for GoodLifeNels - an AI-powered family nutrition planning app.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 (with custom GoodLifeNels brand colors)
- **State Management**: Zustand + React Query
- **Backend**: Supabase (PostgreSQL + Auth + Storage)
- **AI**: Anthropic Claude Sonnet 4.5
- **Forms**: React Hook Form
- **Animations**: Framer Motion

## Project Structure

```
apps/web/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout with sidebar navigation
│   ├── page.tsx           # Home page
│   ├── plan/              # Meal planning page
│   ├── shop/              # Shopping list & inventory
│   ├── track/             # Progress tracking
│   └── settings/          # User settings
├── components/
│   ├── layout/            # Layout components (Sidebar, etc.)
│   └── ui/                # Reusable UI components
├── lib/
│   ├── supabase/          # Supabase client configuration
│   │   ├── client.ts      # Client-side Supabase client
│   │   └── server.ts      # Server-side Supabase client
│   └── providers/         # React providers
│       └── QueryProvider.tsx  # React Query provider
├── stores/
│   ├── authStore.ts       # Authentication state (Zustand)
│   └── uiStore.ts         # UI state (Zustand)
├── hooks/                 # Custom React hooks
└── styles/
    └── globals.css        # Global styles with brand colors
```

## Installation

### Prerequisites

- Node.js 18+ and npm 9+
- A Supabase account (https://supabase.com)
- An Anthropic API key (https://anthropic.com)

### Steps

1. **Navigate to the web app directory:**
   ```bash
   cd apps/web
   ```

2. **Install dependencies:**

   Note: There may be dependency resolution issues due to the monorepo workspace configuration. To work around this:

   ```bash
   # Option 1: Install from the root directory
   cd ../..
   npm install --workspace=apps/web

   # Option 2: If that fails, manually add the packages to package.json
   # Then run: npm install --legacy-peer-deps
   ```

   Required dependencies:
   - `@supabase/supabase-js` - Supabase client
   - `@supabase/ssr` - Supabase SSR helpers for Next.js
   - `zustand` - State management
   - `@tanstack/react-query` - Server state management
   - `react-hook-form` - Form handling
   - `framer-motion` - Animations

3. **Set up environment variables:**
   ```bash
   cp .env.example .env.local
   ```

   Then edit `.env.local` with your actual credentials:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
   ANTHROPIC_API_KEY=your-anthropic-api-key
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

   Or from the root directory:
   ```bash
   npm run dev:web
   ```

5. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Configuration

### Brand Colors

The app uses a custom color palette defined in `app/globals.css`:

- **Primary**: Deep Forest Green (#2C5F2D)
- **Secondary**: Ocean Blue (#1B4965)
- **Accent**: Vibrant Lime (#9ACD32)
- **Neutrals**: Soft Beige, Light Gray, Dark Gray, Off-Black

All colors are available as CSS custom properties (e.g., `var(--color-forest-green)`).

### Custom Utility Classes

- `.card` - Card container with shadow and rounded corners
- `.btn-primary` - Primary button with green background
- `.btn-secondary` - Secondary button with blue outline

## Supabase Setup

1. **Create a new Supabase project:**
   - Go to https://supabase.com
   - Create a new project
   - Note down the project URL and anon key

2. **Run database migrations:**
   ```bash
   # From the project root
   cd ../../supabase
   supabase db push
   ```

3. **Set up authentication:**
   - Enable email/password auth in Supabase dashboard
   - Configure email templates (optional)

## Development Workflow

### Adding New Pages

1. Create a new folder in `app/` (e.g., `app/recipes/`)
2. Add a `page.tsx` file
3. The route will be automatically available at `/recipes`

### Adding Components

1. Create components in `components/ui/` or `components/layout/`
2. Use TypeScript for type safety
3. Follow the existing naming conventions

### State Management

- **Client State**: Use Zustand stores (`stores/`)
- **Server State**: Use React Query hooks
- **Authentication**: Use `useAuthStore()` from `stores/authStore.ts`

### Styling

- Use Tailwind CSS classes for layout and spacing
- Use CSS custom properties for brand colors
- Avoid hardcoded color values

## Building for Production

```bash
npm run build
npm run start
```

## Deployment

The app is optimized for deployment on Vercel:

1. Push your code to GitHub
2. Import the project in Vercel
3. Set environment variables in Vercel dashboard
4. Deploy!

Alternatively, you can deploy to any Node.js hosting platform that supports Next.js.

## Troubleshooting

### Dependency Installation Issues

If you encounter `ETARGET` errors during npm install, it's likely due to workspace configuration conflicts:

1. Try installing from the root directory with `--workspace=apps/web`
2. If that fails, use `--legacy-peer-deps` flag
3. As a last resort, temporarily disable workspaces in root package.json

### Supabase Connection Errors

- Verify your environment variables are correct
- Check that your Supabase project is active
- Ensure you're using the correct API keys (anon key for client, service role for server)

### TypeScript Errors

- Run `npm run type-check` to see all TypeScript errors
- Ensure all dependencies are installed correctly
- Check that imports use the `@/` alias correctly

## Next Steps

1. Set up the database schema (see `../../docs/DATABASE_SCHEMA.md`)
2. Implement authentication flow
3. Build the questionnaire component
4. Integrate AI meal plan generation
5. Implement shopping list functionality

For more information, see the main project documentation in `../../docs/`.
