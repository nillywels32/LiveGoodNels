# 🗄️ Supabase Setup Guide

## Current Status

✅ **Supabase Project:** https://rnnkhpuwdqtoavpflrdw.supabase.co
✅ **Environment Variables:** Configured in all `.env.local` files
🔜 **Database Schema:** Needs to be deployed

---

## Step 1: Deploy Database Schema

### Option A: Using SQL Editor (Easiest)

1. Go to your Supabase project: https://supabase.com/dashboard/project/rnnkhpuwdqtoavpflrdw

2. Click **SQL Editor** in the left sidebar

3. Click **New Query**

4. Copy the entire contents of `supabase/migrations/001_initial_schema.sql`

5. Paste into the SQL Editor

6. Click **Run** (or press Ctrl+Enter)

7. Wait for it to complete (may take 30-60 seconds)

### Option B: Using Supabase CLI (Advanced)

```bash
# Get your Supabase access token
# Go to: https://supabase.com/dashboard/account/tokens
# Click "Generate new token"
# Copy the token

# Set it as environment variable
set SUPABASE_ACCESS_TOKEN=your-token-here

# Link project
npx supabase link --project-ref rnnkhpuwdqtoavpflrdw

# Push migrations
npx supabase db push
```

---

## Step 2: Seed Database with Recipes

### Using SQL Editor

1. In **SQL Editor**, create another **New Query**

2. Copy the entire contents of `supabase/seed.sql`

3. Paste into the SQL Editor

4. Click **Run**

5. You should now have 15 curated recipes in your database!

---

## Step 3: Verify Database

1. Go to **Table Editor** in Supabase dashboard

2. You should see all these tables:
   - users
   - family_profiles
   - family_members
   - recipes (with 15 rows)
   - nutrition_profiles
   - food_frequency_rules
   - macro_targets
   - meal_plans
   - planned_meals
   - shopping_lists
   - shopping_items
   - inventory
   - questionnaire_responses
   - meal_feedback
   - juice_plans
   - user_preferences

3. Click on **recipes** table - you should see 15 recipes

---

## Step 4: Deploy Edge Functions

### Get Access Token

1. Go to: https://supabase.com/dashboard/account/tokens
2. Generate a new token
3. Copy it

### Deploy Functions

```bash
# Set access token
set SUPABASE_ACCESS_TOKEN=your-token-here

# Deploy all functions
npx supabase functions deploy generate-meal-plan
npx supabase functions deploy generate-plan-b
npx supabase functions deploy daily-checkin
npx supabase functions deploy adapt-for-kids
```

### Set Environment Variables in Supabase

1. Go to: https://supabase.com/dashboard/project/rnnkhpuwdqtoavpflrdw/settings/functions

2. Add these secrets:
   - `ANTHROPIC_API_KEY` = your Anthropic API key

---

## Step 5: Test Connection

### Test from Web App

```bash
cd apps/web
npm run dev
```

Visit http://localhost:3000 - the Supabase client should connect!

### Test from Mobile App

```bash
cd apps/mobile
npm start
```

Scan QR code with Expo Go - Supabase should connect!

---

## Troubleshooting

### "relation does not exist" Error

This means tables weren't created. Go back to Step 1 and run the migration SQL.

### "permission denied" Error

This means Row-Level Security is blocking you. Either:
- Sign in as a user first
- Or temporarily disable RLS for testing

### Edge Functions Not Working

Make sure you set the `ANTHROPIC_API_KEY` in Supabase Functions settings.

---

## What's Configured

### Environment Files

✅ **Root** (`.env.local`):
- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY
- SUPABASE_SERVICE_ROLE_KEY
- ANTHROPIC_API_KEY (needs to be added)

✅ **Web App** (`apps/web/.env.local`):
- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY
- SUPABASE_SERVICE_ROLE_KEY
- ANTHROPIC_API_KEY (needs to be added)

✅ **Mobile App** (`apps/mobile/.env.local`):
- EXPO_PUBLIC_SUPABASE_URL
- EXPO_PUBLIC_SUPABASE_ANON_KEY

---

## Next Steps

Once database is deployed:

1. ✅ Test authentication (sign up/sign in)
2. ✅ Test creating a family profile
3. ✅ Test AI meal plan generation
4. ✅ Start building Phase 1 features!

---

**Need help?** Check the Supabase docs: https://supabase.com/docs
