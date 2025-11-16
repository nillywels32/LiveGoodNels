# GoodLifeNels - Supabase Edge Functions

This directory contains the Anthropic Claude AI integration Edge Functions for GoodLifeNels. These functions power the intelligent meal planning, recipe adaptation, and daily check-in features.

## Table of Contents

- [Overview](#overview)
- [Functions](#functions)
- [Architecture](#architecture)
- [Environment Variables](#environment-variables)
- [Local Development](#local-development)
- [Testing](#testing)
- [Deployment](#deployment)
- [API Usage](#api-usage)
- [Cost Estimation](#cost-estimation)
- [Troubleshooting](#troubleshooting)

---

## Overview

All Edge Functions use:
- **Runtime**: Deno (Supabase Edge Functions run on Deno, not Node.js)
- **AI Model**: Claude Sonnet 4.5 (`claude-sonnet-4-5-20250929`) via Anthropic API
- **Prompts**: Based on `AI_PROMPT_LIBRARY.md`
- **Architecture**: Shared utilities in `_shared/` for consistency

### Key Features

- **Type-safe**: Full TypeScript type definitions
- **Error handling**: Comprehensive error handling with retries
- **Validation**: Input and output validation for all functions
- **CORS support**: Cross-origin requests enabled
- **Token optimization**: Efficient prompt design to minimize costs

---

## Functions

### 1. generate-meal-plan

Generates a complete 7-day meal plan based on questionnaire responses, nutrition profile, and current inventory.

**Endpoint**: `POST /functions/v1/generate-meal-plan`

**Files**:
- `index.ts` - Main handler
- `prompts.ts` - System and user prompt templates
- `types.ts` - TypeScript type definitions
- `utils.ts` - Helper functions (validation, date calculations)

**Temperature**: 0.7 (creative but consistent)
**Max Tokens**: 4096
**Estimated Cost**: ~$0.50 per generation

### 2. generate-plan-b

Generates an alternative meal when a user rejects a planned meal, using current inventory.

**Endpoint**: `POST /functions/v1/generate-plan-b`

**Files**:
- `index.ts` - Main handler
- `prompts.ts` - Plan B prompt templates
- `types.ts` - Type definitions for rejected meals and alternatives
- `utils.ts` - Validation and macro comparison utilities

**Temperature**: 0.8 (more creativity for alternatives)
**Max Tokens**: 2048
**Estimated Cost**: ~$0.15 per generation

### 3. daily-checkin

Generates a personalized morning check-in message based on today's meal plan and schedule.

**Endpoint**: `POST /functions/v1/daily-checkin`

**Files**:
- `index.ts` - Main handler
- `prompts.ts` - Check-in prompt templates
- `types.ts` - Type definitions for check-in messages
- `utils.ts` - Schedule analysis and validation utilities

**Temperature**: 0.6 (consistent but personable)
**Max Tokens**: 1024
**Estimated Cost**: ~$0.10 per generation

### 4. adapt-for-kids

Adapts adult recipes to be kid-friendly with creative presentations and age-appropriate tasks.

**Endpoint**: `POST /functions/v1/adapt-for-kids`

**Files**:
- `index.ts` - Main handler
- `prompts.ts` - Kid adaptation prompt templates
- `types.ts` - Type definitions for kid-friendly recipes
- `utils.ts` - Age group detection, allergen checking, choking hazard identification

**Temperature**: 0.9 (maximum creativity for kid engagement)
**Max Tokens**: 2048
**Estimated Cost**: ~$0.12 per generation

---

## Architecture

### Directory Structure

```
supabase/functions/
├── _shared/
│   ├── anthropic.ts      # Anthropic API client wrapper
│   └── cors.ts            # CORS headers and utilities
├── generate-meal-plan/
│   ├── index.ts           # Main handler
│   ├── prompts.ts         # AI prompts
│   ├── types.ts           # Type definitions
│   └── utils.ts           # Helper functions
├── generate-plan-b/
│   ├── index.ts
│   ├── prompts.ts
│   ├── types.ts
│   └── utils.ts
├── daily-checkin/
│   ├── index.ts
│   ├── prompts.ts
│   ├── types.ts
│   └── utils.ts
├── adapt-for-kids/
│   ├── index.ts
│   ├── prompts.ts
│   ├── types.ts
│   └── utils.ts
└── README.md              # This file
```

### Shared Utilities

#### `_shared/anthropic.ts`

Provides:
- `createAnthropicClient()` - Initialize Anthropic client
- `sendMessage()` - Send message and get text response
- `sendMessageWithJSON()` - Send message and parse JSON response
- `retryWithBackoff()` - Retry failed requests with exponential backoff
- `getAnthropicApiKey()` - Get API key from environment

#### `_shared/cors.ts`

Provides:
- `corsHeaders` - Standard CORS headers
- `jsonResponse()` - Create JSON response with CORS
- `errorResponse()` - Create error response with CORS
- `handleOptions()` - Handle OPTIONS preflight requests
- `isMethodAllowed()` - Validate HTTP methods

---

## Environment Variables

All functions require the following environment variables:

### Required

```bash
ANTHROPIC_API_KEY=sk-ant-...  # Your Anthropic API key
```

### How to Set Environment Variables

#### Local Development

Create a `.env.local` file in the root directory:

```bash
ANTHROPIC_API_KEY=sk-ant-your-key-here
```

Load it when starting Supabase:

```bash
supabase functions serve --env-file .env.local
```

#### Production (Supabase Dashboard)

1. Go to **Settings** > **Edge Functions**
2. Add environment variables:
   - Key: `ANTHROPIC_API_KEY`
   - Value: `sk-ant-...`

Or use CLI:

```bash
supabase secrets set ANTHROPIC_API_KEY=sk-ant-your-key-here
```

---

## Local Development

### Prerequisites

1. **Install Supabase CLI**:
   ```bash
   npm install -g supabase
   ```

2. **Install Deno** (optional, for linting/testing):
   ```bash
   # macOS/Linux
   curl -fsSL https://deno.land/install.sh | sh

   # Windows
   irm https://deno.land/install.ps1 | iex
   ```

3. **Get Anthropic API Key**:
   - Sign up at https://console.anthropic.com
   - Create an API key
   - Add to `.env.local`

### Start Local Development Server

```bash
# Start Supabase locally (includes Edge Functions)
supabase start

# Serve functions with environment variables
supabase functions serve --env-file .env.local

# Or serve a specific function
supabase functions serve generate-meal-plan --env-file .env.local
```

The functions will be available at:
- `http://localhost:54321/functions/v1/generate-meal-plan`
- `http://localhost:54321/functions/v1/generate-plan-b`
- `http://localhost:54321/functions/v1/daily-checkin`
- `http://localhost:54321/functions/v1/adapt-for-kids`

### Watch Mode (Auto-reload)

```bash
# Watch for changes and auto-reload
supabase functions serve --env-file .env.local --debug
```

---

## Testing

### Manual Testing with cURL

#### 1. Test generate-meal-plan

```bash
curl -X POST http://localhost:54321/functions/v1/generate-meal-plan \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_SUPABASE_ANON_KEY" \
  -d '{
    "weekStart": "2025-11-17",
    "questionnaireResponses": [
      {
        "userId": "user-1",
        "responses": {
          "cravings": ["tacos", "salmon"],
          "energyLevel": "high",
          "workoutSchedule": ["Monday", "Wednesday", "Friday"]
        }
      }
    ],
    "nutritionProfile": {
      "familyId": "family-1",
      "avoidFoods": [],
      "healthGoals": ["increase protein", "more vegetables"]
    },
    "inventory": [
      { "name": "Organic spinach", "quantity": 2, "unit": "cups", "category": "produce" }
    ],
    "foodFrequencyRules": {
      "top15Foods": ["broccoli sprouts", "turmeric", "blueberries"],
      "targetFrequency": {}
    },
    "macroTargets": {
      "Monday": { "protein": 120, "carbs": 150, "fats": 50, "fiber": 35, "calories": 1580 }
    }
  }'
```

#### 2. Test generate-plan-b

```bash
curl -X POST http://localhost:54321/functions/v1/generate-plan-b \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_SUPABASE_ANON_KEY" \
  -d '{
    "rejectedMeal": {
      "name": "Quinoa Buddha Bowl",
      "macros": { "protein": 25, "carbs": 40, "fats": 12, "fiber": 8, "calories": 360 },
      "mealType": "lunch"
    },
    "rejectionReason": "Not feeling quinoa today",
    "inventory": [
      { "name": "Chicken breast", "quantity": 2, "unit": "lbs", "category": "protein" },
      { "name": "Broccoli", "quantity": 1, "unit": "head", "category": "produce" }
    ],
    "preferences": {
      "favoriteFoods": ["chicken", "vegetables"],
      "prepTimeMax": 30
    },
    "mealType": "lunch"
  }'
```

#### 3. Test daily-checkin

```bash
curl -X POST http://localhost:54321/functions/v1/daily-checkin \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_SUPABASE_ANON_KEY" \
  -d '{
    "userId": "user-1",
    "userName": "Sarah",
    "date": "2025-11-17",
    "dayOfWeek": "Monday",
    "todaysMeals": {
      "breakfast": {
        "name": "Berry Smoothie Bowl",
        "prepTime": 10,
        "cookTime": 0,
        "ingredients": [],
        "macros": { "protein": 28, "carbs": 45, "fats": 14, "fiber": 12, "calories": 410 }
      }
    },
    "schedule": [
      { "time": "9:00 AM", "activity": "Workout" },
      { "time": "6:00 PM", "activity": "Dinner prep" }
    ],
    "recentContext": {
      "energyLevel": "high",
      "workoutToday": true,
      "cookingTonight": "Sarah"
    }
  }'
```

#### 4. Test adapt-for-kids

```bash
curl -X POST http://localhost:54321/functions/v1/adapt-for-kids \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_SUPABASE_ANON_KEY" \
  -d '{
    "recipe": {
      "name": "Quinoa Buddha Bowl",
      "prepTime": 20,
      "cookTime": 15,
      "servings": 2,
      "macros": { "protein": 25, "carbs": 40, "fats": 12, "fiber": 8, "calories": 360 },
      "ingredients": [
        { "name": "Quinoa", "quantity": 1, "unit": "cup", "category": "grains" },
        { "name": "Broccoli", "quantity": 2, "unit": "cups", "category": "produce" }
      ],
      "instructions": ["Cook quinoa", "Steam broccoli", "Combine in bowl"]
    },
    "kidAges": [2, 3],
    "kidPreferences": {
      "loved": ["berries", "chicken"],
      "disliked": ["onions", "mushrooms"],
      "texturePreferences": {
        "likes": ["crunchy", "smooth"],
        "dislikes": ["mushy"]
      }
    },
    "nutritionGoals": {
      "increaseProtein": true,
      "increaseFiber": true
    }
  }'
```

### Integration Testing

Create test files in `__tests__/`:

```typescript
// __tests__/generate-meal-plan.test.ts
import { assertEquals } from "https://deno.land/std@0.168.0/testing/asserts.ts";

Deno.test("generate-meal-plan returns valid meal plan", async () => {
  const response = await fetch("http://localhost:54321/functions/v1/generate-meal-plan", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      // Test input
    }),
  });

  const data = await response.json();
  assertEquals(response.status, 200);
  assertEquals(data.mealPlan.meals.length, 7);
});
```

Run tests:

```bash
deno test --allow-net __tests__/
```

---

## Deployment

### Deploy All Functions

```bash
# Deploy all functions to Supabase
supabase functions deploy

# Or deploy specific function
supabase functions deploy generate-meal-plan
```

### Deploy with Secrets

```bash
# Set secrets first
supabase secrets set ANTHROPIC_API_KEY=sk-ant-your-key-here

# Then deploy
supabase functions deploy
```

### Verify Deployment

```bash
# List deployed functions
supabase functions list

# Check function logs
supabase functions logs generate-meal-plan

# Follow logs in real-time
supabase functions logs generate-meal-plan --follow
```

---

## API Usage

### Authentication

All requests require a valid Supabase JWT token or anon key:

```typescript
const response = await fetch(
  `${SUPABASE_URL}/functions/v1/generate-meal-plan`,
  {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${session.access_token}`,
      "Content-Type": "application/json",
      "apikey": SUPABASE_ANON_KEY,
    },
    body: JSON.stringify(requestData),
  }
);
```

### Error Handling

All functions return consistent error responses:

```json
{
  "error": "Human-readable error message",
  "details": "Technical details (optional)",
  "timestamp": "2025-11-17T09:00:00.000Z"
}
```

**HTTP Status Codes**:
- `200` - Success
- `400` - Validation error (bad input)
- `401` - Unauthorized (missing/invalid auth)
- `405` - Method not allowed
- `500` - Internal server error
- `503` - AI service unavailable

### Example: React Hook

```typescript
import { useQuery } from '@tanstack/react-query';

export function useGenerateMealPlan(input: MealPlanInput) {
  return useMutation({
    mutationFn: async (input: MealPlanInput) => {
      const response = await fetch(
        `${SUPABASE_URL}/functions/v1/generate-meal-plan`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${session.access_token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(input),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error);
      }

      return response.json();
    },
    onSuccess: (data) => {
      console.log('Meal plan generated:', data.mealPlan);
      console.log('Token usage:', data.usage);
    },
    onError: (error) => {
      console.error('Failed to generate meal plan:', error);
    },
  });
}
```

---

## Cost Estimation

### Token Usage (Approximate)

| Function | Input Tokens | Output Tokens | Cost per Call | Monthly (Active Family) |
|----------|--------------|---------------|---------------|-------------------------|
| generate-meal-plan | 30,000 | 4,000 | $0.50 | $2.00 (4 plans) |
| generate-plan-b | 10,000 | 2,000 | $0.15 | $0.60 (4 uses) |
| daily-checkin | 5,000 | 1,000 | $0.10 | $3.00 (30 days) |
| adapt-for-kids | 8,000 | 2,000 | $0.12 | $0.40 (2-3 uses) |

**Total Monthly Cost**: ~$6-8 per active family

### Cost Optimization Tips

1. **Prompt Caching**: Use Anthropic's prompt caching for static context
2. **Summarize History**: Don't send raw feedback, summarize it
3. **Reuse Results**: Cache meal plans when preferences haven't changed
4. **Batch Operations**: Generate all weekly check-ins at once

---

## Troubleshooting

### Common Issues

#### 1. "ANTHROPIC_API_KEY environment variable is not set"

**Solution**:
```bash
# Local
supabase functions serve --env-file .env.local

# Production
supabase secrets set ANTHROPIC_API_KEY=sk-ant-your-key
```

#### 2. "Invalid JSON response from Claude"

**Cause**: Claude didn't return valid JSON

**Solution**: The function automatically retries with stricter instructions. If it still fails, check:
- Prompt is clear about JSON output
- Max tokens is sufficient (4096 recommended)

#### 3. "AI service temporarily unavailable" (503)

**Cause**: Anthropic API is overloaded or rate limited

**Solution**: Functions automatically retry with exponential backoff. If persistent:
- Check Anthropic status: https://status.anthropic.com
- Verify API key is valid
- Check rate limits on your Anthropic account

#### 4. CORS errors in browser

**Cause**: Missing CORS headers

**Solution**: All functions include CORS headers. If issues persist:
- Verify you're including `apikey` header
- Check Supabase project settings allow your domain

### Debug Mode

Enable debug logging:

```bash
# Local
supabase functions serve --debug

# Check function logs
supabase functions logs generate-meal-plan --follow
```

### Performance Issues

If functions are slow:

1. **Check token count**: Large prompts = slower responses
2. **Use smaller max_tokens**: Reduce if possible
3. **Implement caching**: Cache similar requests
4. **Monitor**: Use Supabase dashboard to track function performance

---

## Additional Resources

- **AI Prompt Library**: See `docs/AI_PROMPT_LIBRARY.md` for all prompts
- **Technical Spec**: See `docs/TECHNICAL_SPEC.md` for API design
- **Database Schema**: See `docs/DATABASE_SCHEMA.md` for data models
- **Supabase Docs**: https://supabase.com/docs/guides/functions
- **Anthropic Docs**: https://docs.anthropic.com/claude/reference
- **Deno Docs**: https://deno.land/manual

---

## Support

For issues or questions:

1. Check logs: `supabase functions logs <function-name>`
2. Review error messages in function responses
3. Verify environment variables are set correctly
4. Test locally before deploying to production

---

**Last Updated**: November 15, 2025
**Version**: 1.0
