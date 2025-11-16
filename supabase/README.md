# GoodLifeNels Supabase Backend

Complete Supabase backend setup for GoodLifeNels meal planning application.

## Table of Contents

- [Overview](#overview)
- [Database Schema](#database-schema)
- [Local Development Setup](#local-development-setup)
- [Running Migrations](#running-migrations)
- [Seeding Data](#seeding-data)
- [Edge Functions](#edge-functions)
- [Deployment](#deployment)
- [Testing](#testing)
- [Troubleshooting](#troubleshooting)

---

## Overview

This Supabase backend provides:

- **PostgreSQL Database**: Complete schema with 16 tables
- **Row-Level Security (RLS)**: Multi-tenant data isolation
- **Database Functions**: Automated triggers and utilities
- **Edge Functions**: Serverless functions for AI meal planning
- **Real-time Subscriptions**: Live updates for collaborative features

### Tech Stack

- **Database**: PostgreSQL 15+
- **Auth**: Supabase Auth with Apple & Google OAuth
- **Storage**: Supabase Storage for recipe images
- **Edge Functions**: Deno runtime with TypeScript
- **AI Integration**: OpenAI GPT-4 for meal plan generation

---

## Database Schema

### Core Tables

1. **users** - App users (synced with auth.users)
2. **family_profiles** - Family units
3. **family_members** - Links users to families
4. **recipes** - Recipe database (curated + AI-generated)
5. **meal_plans** - Weekly meal plans
6. **planned_meals** - Individual meals in plans
7. **shopping_lists** - Auto-generated shopping lists
8. **shopping_items** - Individual shopping items
9. **inventory** - Current ingredient inventory
10. **nutrition_profiles** - Family nutrition preferences
11. **food_frequency_rules** - Top 15 superfood frequency rules
12. **macro_targets** - Daily macro targets by activity
13. **questionnaire_responses** - Weekly questionnaire data
14. **meal_feedback** - User feedback on meals
15. **juice_plans** - Juice batch prep plans
16. **user_preferences** - App preferences

### Top 15 Superfoods

The database emphasizes these nutrient-dense foods:

1. Broccoli sprouts
2. Turmeric
3. Blueberries
4. Broccoli
5. Flaxseed
6. Dark leafy greens
7. Garlic
8. Mushrooms
9. Cacao
10. Tigernuts
11. Ginger root
12. Grapes
13. Tomatoes
14. Lemon
15. Quinoa

See [DATABASE_SCHEMA.md](../docs/DATABASE_SCHEMA.md) for complete documentation.

---

## Local Development Setup

### Prerequisites

- [Node.js](https://nodejs.org/) 18+
- [Supabase CLI](https://supabase.com/docs/guides/cli)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (for local Supabase)

### Installation

1. **Install Supabase CLI**

```bash
npm install -g supabase
```

2. **Verify installation**

```bash
supabase --version
```

3. **Start Supabase locally**

```bash
# From project root
supabase start
```

This will:
- Start PostgreSQL database
- Start Supabase Studio (UI)
- Start Auth server
- Start Storage server
- Start Edge Functions runtime

**Important**: First run will download Docker images (~1-2 GB). This may take a few minutes.

4. **Access local services**

After starting, you'll see output like:

```
API URL: http://127.0.0.1:54321
GraphQL URL: http://127.0.0.1:54321/graphql/v1
DB URL: postgresql://postgres:postgres@127.0.0.1:54322/postgres
Studio URL: http://127.0.0.1:54323
Inbucket URL: http://127.0.0.1:54324
JWT secret: super-secret-jwt-token-with-at-least-32-characters-long
anon key: eyJ...
service_role key: eyJ...
```

**Save these credentials** - you'll need them for your app configuration.

5. **Open Supabase Studio**

```bash
# Studio opens at http://127.0.0.1:54323
open http://127.0.0.1:54323
```

Use Studio to:
- Browse database tables
- View RLS policies
- Test queries
- Manage auth users
- View Edge Function logs

---

## Running Migrations

Migrations are located in `supabase/migrations/` and run in alphabetical order.

### Apply Migrations Locally

```bash
# Run all pending migrations
supabase db reset

# This will:
# 1. Drop the database
# 2. Recreate it
# 3. Run all migrations in order
```

### Check Migration Status

```bash
supabase migration list
```

### Create New Migration

```bash
supabase migration new my_migration_name

# This creates: supabase/migrations/TIMESTAMP_my_migration_name.sql
```

### Best Practices

- **Never edit existing migrations** - create new ones instead
- **Test locally first** - always test migrations with `supabase db reset`
- **Use transactions** - wrap DDL in `BEGIN; ... COMMIT;` for safety
- **Add comments** - document complex queries
- **Include rollback** - comment how to reverse the migration

### Migration Structure

Our initial migration (`001_initial_schema.sql`) includes:

1. **Extensions** - Enable uuid-ossp, pg_trgm
2. **Functions** - Reusable database functions
3. **Tables** - All 16 tables in dependency order
4. **Indexes** - Performance indexes (GIN, B-tree)
5. **Triggers** - Auto-update timestamps, counters
6. **RLS** - Enable + policies for all tables

---

## Seeding Data

Seed data populates the database with:
- 15 curated recipes aligned with "Go Back to Nature" philosophy
- Top 15 superfood references
- Example nutrition profiles and macro targets

### Seed Local Database

```bash
# Run seed file
supabase db reset --db-url postgresql://postgres:postgres@127.0.0.1:54322/postgres

# Then manually run seed:
psql postgresql://postgres:postgres@127.0.0.1:54322/postgres < supabase/seed.sql
```

**OR** combine migration + seed:

```bash
# Add seed to migration (one-time setup)
cat supabase/seed.sql >> supabase/migrations/002_seed_data.sql

# Then reset will include seed
supabase db reset
```

### Verify Seed Data

```bash
# Connect to local database
supabase db reset

# In Studio SQL editor or psql:
SELECT name, meal_type, source, top_15_foods
FROM recipes
WHERE source = 'curated'
ORDER BY created_at;
```

You should see 15 curated recipes.

### Seed Production (Careful!)

```bash
# Link to production project
supabase link --project-ref your-project-ref

# Seed production (USE WITH CAUTION)
psql $(supabase db remote-url) < supabase/seed.sql
```

**Warning**: Only seed production once during initial setup!

---

## Edge Functions

Edge Functions are serverless TypeScript/JavaScript functions that run on Supabase's global edge network.

### Available Functions

1. **generate-meal-plan** - AI-powered meal plan generation
2. **daily-checkin** - Daily notification and check-in
3. **generate-plan-b** - Quick alternative meal suggestions

### Directory Structure

```
supabase/functions/
├── _shared/           # Shared utilities
│   ├── cors.ts        # CORS headers
│   └── supabase.ts    # Supabase client
├── generate-meal-plan/
│   └── index.ts
├── daily-checkin/
│   └── index.ts
└── generate-plan-b/
    └── index.ts
```

### Running Functions Locally

```bash
# Serve all functions
supabase functions serve

# Serve specific function
supabase functions serve generate-meal-plan

# With environment variables
supabase functions serve --env-file .env.local
```

### Testing Functions Locally

```bash
# Using curl
curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/generate-meal-plan' \
  --header 'Authorization: Bearer YOUR_ANON_KEY' \
  --header 'Content-Type: application/json' \
  --data '{"familyId":"test-family-id"}'

# Using the Functions tab in Supabase Studio
```

### Environment Variables

Create `.env.local` in project root:

```bash
# OpenAI (for AI meal planning)
OPENAI_API_KEY=sk-...

# Supabase (auto-populated by CLI)
SUPABASE_URL=http://127.0.0.1:54321
SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...

# Apple Reminders (optional)
APPLE_REMINDERS_ENABLED=false
```

### Create New Function

```bash
supabase functions new my-function-name

# This creates:
# supabase/functions/my-function-name/index.ts
```

### Deploy Functions

```bash
# Deploy all functions
supabase functions deploy

# Deploy specific function
supabase functions deploy generate-meal-plan

# With secrets
supabase secrets set OPENAI_API_KEY=sk-...
supabase functions deploy generate-meal-plan
```

### View Function Logs

```bash
# In Studio: Functions tab > Logs

# Or via CLI:
supabase functions logs generate-meal-plan
```

---

## Deployment

### Deploy to Supabase Cloud

1. **Create Supabase project**

```bash
# Go to https://app.supabase.com
# Create new project
# Note your project reference ID
```

2. **Link local project**

```bash
supabase link --project-ref your-project-ref
```

3. **Push database migrations**

```bash
# Dry run (preview changes)
supabase db push --dry-run

# Push for real
supabase db push
```

4. **Seed production database**

```bash
# Get remote database URL
supabase db remote-url

# Seed (one-time only!)
psql $(supabase db remote-url) < supabase/seed.sql
```

5. **Deploy Edge Functions**

```bash
# Set production secrets
supabase secrets set OPENAI_API_KEY=sk-your-production-key

# Deploy all functions
supabase functions deploy
```

6. **Configure Auth providers**

In Supabase Dashboard:
- Go to Authentication > Providers
- Enable Apple Sign In
- Enable Google Sign In
- Configure OAuth credentials

### Environment Variables (Production)

```bash
# Set secrets (encrypted environment variables)
supabase secrets set OPENAI_API_KEY=sk-...
supabase secrets set APPLE_REMINDERS_ENABLED=true

# List secrets
supabase secrets list
```

### Database Backups

Supabase automatically backs up your database daily. For manual backups:

```bash
# Export database
supabase db dump -f backup_$(date +%Y%m%d).sql

# Restore from backup
psql $(supabase db remote-url) < backup_20251115.sql
```

---

## Testing

### Test Database Schema

```sql
-- Verify all tables exist
SELECT tablename
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY tablename;

-- Check RLS is enabled
SELECT tablename, rowsecurity
FROM pg_tables
WHERE schemaname = 'public'
AND rowsecurity = true;

-- Verify indexes
SELECT indexname, tablename
FROM pg_indexes
WHERE schemaname = 'public'
ORDER BY tablename, indexname;
```

### Test RLS Policies

```sql
-- Test as authenticated user
SET request.jwt.claim.sub = 'user-uuid-here';

-- Try to select from users table (should only see own data)
SELECT * FROM users;

-- Reset
RESET request.jwt.claim.sub;
```

### Test Triggers

```sql
-- Test updated_at trigger
UPDATE users SET name = 'Test' WHERE id = 'user-id';
SELECT updated_at FROM users WHERE id = 'user-id';
-- updated_at should be NOW()

-- Test shopping list auto-creation
INSERT INTO meal_plans (family_id, week_start, week_end)
VALUES ('family-id', '2025-11-17', '2025-11-23');

-- Check shopping list was created
SELECT * FROM shopping_lists WHERE family_id = 'family-id';
```

### Integration Tests

```bash
# Run integration tests (if configured)
npm run test:integration

# Test Edge Functions
supabase functions serve &
npm run test:functions
```

---

## Troubleshooting

### Common Issues

#### Issue: Supabase won't start

```bash
# Check Docker is running
docker ps

# Stop and restart Supabase
supabase stop
supabase start

# Remove volumes (WARNING: deletes data)
supabase stop --no-backup
docker volume prune
supabase start
```

#### Issue: Migration fails

```bash
# Check migration SQL syntax
psql postgresql://postgres:postgres@127.0.0.1:54322/postgres < supabase/migrations/001_initial_schema.sql

# View error details
supabase db reset --debug
```

#### Issue: RLS blocking queries

```sql
-- Temporarily disable RLS for testing (DON'T DO IN PRODUCTION!)
ALTER TABLE users DISABLE ROW LEVEL SECURITY;

-- Re-enable
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Check current user
SELECT current_user, auth.uid();
```

#### Issue: Edge Function not working

```bash
# Check function logs
supabase functions logs function-name --limit 50

# Test with verbose output
supabase functions serve --debug

# Verify environment variables
supabase secrets list
```

#### Issue: Can't connect to database

```bash
# Get connection string
supabase status

# Test connection
psql postgresql://postgres:postgres@127.0.0.1:54322/postgres

# Check port isn't in use
lsof -i :54322
```

### Get Help

- [Supabase Docs](https://supabase.com/docs)
- [Supabase Discord](https://discord.supabase.com)
- [GitHub Issues](https://github.com/supabase/supabase/issues)

---

## Additional Resources

### Documentation

- [Complete Database Schema](../docs/DATABASE_SCHEMA.md)
- [AI Prompt Library](../docs/AI_PROMPT_LIBRARY.md)
- [Development Phases](../docs/DEVELOPMENT_PHASES.md)

### Useful Commands

```bash
# Database
supabase db reset              # Reset database
supabase db diff               # Show schema diff
supabase db push              # Push migrations to remote
supabase db remote-url        # Get production DB URL

# Functions
supabase functions serve      # Run functions locally
supabase functions deploy     # Deploy to production
supabase functions logs       # View function logs

# General
supabase status              # Show service status
supabase stop                # Stop local services
supabase link                # Link to remote project
supabase gen types typescript # Generate TypeScript types
```

### Generate TypeScript Types

```bash
# Generate types from database schema
supabase gen types typescript --local > src/types/database.types.ts

# For production
supabase gen types typescript --linked > src/types/database.types.ts
```

---

## Quick Start Checklist

- [ ] Install Supabase CLI
- [ ] Start local Supabase (`supabase start`)
- [ ] Run migrations (`supabase db reset`)
- [ ] Seed database (`psql ... < seed.sql`)
- [ ] Verify in Studio (`http://127.0.0.1:54323`)
- [ ] Test Edge Functions (`supabase functions serve`)
- [ ] Generate TypeScript types
- [ ] Configure `.env.local` with keys
- [ ] Test RLS policies
- [ ] Deploy to production

---

**Database Version**: 1.0
**Last Updated**: November 15, 2025
**Maintainer**: GoodLifeNels Team
