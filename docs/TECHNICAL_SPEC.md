# GoodLifeNels - Technical Specification Document

**Version:** 1.0
**Last Updated:** November 15, 2025
**Status:** Planning Phase

---

## Table of Contents
1. [System Architecture](#system-architecture)
2. [Technology Stack](#technology-stack)
3. [Data Models](#data-models)
4. [API Design](#api-design)
5. [AI Integration](#ai-integration)
6. [Apple Ecosystem Integration](#apple-ecosystem-integration)
7. [Authentication & Security](#authentication--security)
8. [Notification System](#notification-system)
9. [State Management](#state-management)
10. [Error Handling](#error-handling)
11. [Performance Considerations](#performance-considerations)
12. [Testing Strategy](#testing-strategy)

---

## System Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Client Layer                             │
├──────────────────────┬──────────────────────────────────────┤
│   iOS App            │   Web App                             │
│   (React Native)     │   (Next.js/React)                     │
└──────────────────────┴──────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                   API Gateway Layer                          │
│              (Supabase Edge Functions)                       │
└─────────────────────────────────────────────────────────────┘
                              │
                    ┌─────────┴──────────┐
                    ▼                    ▼
┌──────────────────────────┐  ┌──────────────────────────┐
│   Database Layer         │  │   AI Service Layer       │
│   (Supabase/PostgreSQL)  │  │   (Anthropic Claude API) │
└──────────────────────────┘  └──────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────────────────────────┐
│              External Integrations                           │
│   • Apple Calendar (EventKit)                               │
│   • Apple Reminders (EventKit)                              │
│   • Apple Lists (Reminders Framework)                       │
└─────────────────────────────────────────────────────────────┘
```

### Architecture Patterns

**Client-Server Model:**
- Clients (mobile/web) communicate with backend via REST API
- Real-time updates via Supabase real-time subscriptions
- Offline-first approach with local caching

**Microservices-Light:**
- Core API (Supabase)
- AI Service (Edge Functions calling Claude)
- Notification Service (Scheduled functions)

**Event-Driven:**
- Meal plan generation triggers shopping list creation
- Inventory updates trigger expiration tracking
- Feedback submission triggers AI learning pipeline

---

## Technology Stack

### Frontend

#### Mobile (iOS - React Native)
```json
{
  "framework": "React Native 0.72+",
  "navigation": "React Navigation 6.x",
  "ui": "React Native Paper 5.x",
  "state": "Zustand 4.x + React Query 4.x",
  "forms": "React Hook Form 7.x",
  "notifications": "expo-notifications",
  "calendar": "@react-native-community/datetimepicker + expo-calendar",
  "storage": "AsyncStorage + MMKV (for performance-critical data)",
  "api": "Supabase JS Client 2.x",
  "animations": "React Native Reanimated 3.x",
  "icons": "react-native-vector-icons"
}
```

#### Web (Next.js)
```json
{
  "framework": "Next.js 14.x (App Router)",
  "react": "React 18.x",
  "styling": "Tailwind CSS 3.x + shadcn/ui",
  "state": "Zustand 4.x + React Query 4.x",
  "forms": "React Hook Form 7.x",
  "api": "Supabase JS Client 2.x",
  "animations": "Framer Motion 10.x"
}
```

### Backend

#### Primary: Supabase
```yaml
Database: PostgreSQL 15+
Authentication: Supabase Auth (email/password, social auth)
Storage: Supabase Storage (recipe images, user uploads)
Edge Functions: Deno-based serverless functions
Real-time: WebSocket subscriptions
Row-Level Security: PostgreSQL RLS policies
```

**Why Supabase:**
- Managed PostgreSQL (relational data model fits meal planning)
- Built-in auth, storage, real-time
- Edge functions for AI integration
- Excellent React/React Native SDKs
- Cost-effective for family-scale usage
- Easy to scale if needed

#### Alternative Considered: Firebase
- Faster initial setup
- Better mobile SDK maturity
- NoSQL (less ideal for complex relationships)
- **Decision:** Supabase chosen for SQL flexibility

### AI Layer

#### Anthropic Claude Sonnet 4.5
```yaml
API: Anthropic REST API
Model: claude-sonnet-4-5-20250929
Features:
  - Streaming responses
  - Large context window (200k tokens)
  - Strong reasoning for meal planning
  - JSON output mode
Integration: Via Supabase Edge Functions
```

### Infrastructure

```yaml
Hosting:
  - Mobile: App Store (iOS)
  - Web: Vercel (Next.js optimal hosting)

Database: Supabase Cloud (managed)

CDN: Vercel Edge Network (web), Supabase Storage CDN (images)

Monitoring:
  - Sentry (error tracking)
  - PostHog (analytics, optional)

CI/CD:
  - GitHub Actions
  - Vercel auto-deploy (web)
  - EAS Build (React Native)
```

---

## Data Models

### Entity Relationship Overview

```
Users ──┬── FamilyProfiles
        │
        ├── MealPlans ──┬── PlannedMeals ──── Recipes
        │               │
        │               └── ShoppingLists ──── ShoppingItems
        │
        ├── Inventory ──── InventoryItems
        │
        ├── QuestionnaireResponses
        │
        ├── MealFeedback
        │
        ├── NutritionProfiles ──┬── FoodFrequencyRules
        │                       └── MacroTargets
        │
        └── Preferences
```

### Core Tables (Detailed in DATABASE_SCHEMA.md)

**Key Entities:**
1. `users` - Adult family members
2. `family_profiles` - Family unit, kids
3. `meal_plans` - Weekly plans
4. `planned_meals` - Individual meals in a plan
5. `recipes` - Curated + AI-generated
6. `shopping_lists` - Master lists
7. `shopping_items` - Individual items
8. `inventory` - Current ingredients
9. `questionnaire_responses` - Weekly questionnaire data
10. `meal_feedback` - Ratings, comments
11. `nutrition_profiles` - Family nutrition rules
12. `food_frequency_rules` - Top 15 foods tracking
13. `macro_targets` - Daily macro goals

---

## API Design

### API Structure

**Base URL:** `https://[project-id].supabase.co`

**Authentication:** JWT tokens (Supabase Auth)

**Headers:**
```
Authorization: Bearer <jwt-token>
Content-Type: application/json
apikey: <supabase-anon-key>
```

### REST Endpoints

#### Authentication
```
POST   /auth/v1/signup
POST   /auth/v1/token?grant_type=password
POST   /auth/v1/logout
GET    /auth/v1/user
```

#### Questionnaire
```
GET    /rest/v1/questionnaire_responses?week=eq.<week-id>&user_id=eq.<user-id>
POST   /rest/v1/questionnaire_responses
PATCH  /rest/v1/questionnaire_responses?id=eq.<id>
```

#### Meal Plans
```
GET    /rest/v1/meal_plans?family_id=eq.<family-id>&week_start=eq.<date>
POST   /rest/v1/meal_plans
GET    /rest/v1/planned_meals?meal_plan_id=eq.<plan-id>
PATCH  /rest/v1/planned_meals?id=eq.<meal-id>
DELETE /rest/v1/planned_meals?id=eq.<meal-id>
```

#### Recipes
```
GET    /rest/v1/recipes?limit=20&offset=0
GET    /rest/v1/recipes?id=eq.<recipe-id>
POST   /rest/v1/recipes (for saving AI-generated recipes)
GET    /rest/v1/recipes?search=fts.<search-term> (full-text search)
```

#### Shopping
```
GET    /rest/v1/shopping_lists?meal_plan_id=eq.<plan-id>
POST   /rest/v1/shopping_lists
PATCH  /rest/v1/shopping_items?id=eq.<item-id> (mark as purchased)
```

#### Inventory
```
GET    /rest/v1/inventory?family_id=eq.<family-id>
POST   /rest/v1/inventory
PATCH  /rest/v1/inventory?id=eq.<item-id>
DELETE /rest/v1/inventory?id=eq.<item-id>
GET    /rest/v1/inventory?expiration_date=lt.<date> (expiring soon)
```

#### Feedback
```
POST   /rest/v1/meal_feedback
GET    /rest/v1/meal_feedback?planned_meal_id=eq.<meal-id>
```

### Edge Functions (AI Integration)

#### Generate Meal Plan
```
POST /functions/v1/generate-meal-plan

Request:
{
  "questionnaireResponses": [
    { "userId": "user1", "responses": {...} },
    { "userId": "user2", "responses": {...} }
  ],
  "nutritionProfile": { ... },
  "inventory": [ ... ],
  "weekStart": "2025-11-17"
}

Response:
{
  "mealPlan": {
    "weekStart": "2025-11-17",
    "meals": [
      {
        "day": "Monday",
        "breakfast": { "recipeId": "...", "name": "...", "macros": {...} },
        "lunch": { ... },
        "dinner": { ... },
        "snacks": [ ... ],
        "juice": { ... },
        "smoothie": { ... }
      },
      ...
    ],
    "weeklyMacros": { ... },
    "shoppingList": [ ... ]
  }
}
```

#### Generate Plan B
```
POST /functions/v1/generate-plan-b

Request:
{
  "rejectedMealId": "meal-123",
  "inventory": [ ... ],
  "preferences": { ... },
  "mealType": "dinner"
}

Response:
{
  "alternativeMeal": {
    "recipeId": "...",
    "name": "...",
    "macros": {...},
    "ingredients": [ ... ],
    "instructions": [ ... ]
  }
}
```

#### Daily Check-in
```
POST /functions/v1/daily-checkin

Request:
{
  "userId": "user1",
  "date": "2025-11-17",
  "todaysMeals": [ ... ],
  "schedule": { ... }
}

Response:
{
  "message": "Good morning! Ready for today's meal plan?",
  "questions": [
    "Do you have organic spinach for tonight's dinner?",
    "Your schedule looks busy - want simpler lunch options?"
  ],
  "suggestions": [ ... ]
}
```

#### Adapt for Kids
```
POST /functions/v1/adapt-for-kids

Request:
{
  "recipeId": "recipe-123",
  "kidAges": [2, 3],
  "kidPreferences": { ... }
}

Response:
{
  "adaptedRecipe": {
    "name": "...",
    "kidFriendlyTips": [ ... ],
    "modifications": [ ... ],
    "ageTasks": {
      "2-3": ["Wash veggies", "Stir bowl"]
    }
  }
}
```

### Real-Time Subscriptions

**Supabase Real-time Channels:**

```javascript
// Subscribe to meal plan updates
supabase
  .channel('meal-plan-changes')
  .on('postgres_changes',
    {
      event: '*',
      schema: 'public',
      table: 'meal_plans',
      filter: `family_id=eq.${familyId}`
    },
    (payload) => {
      // Handle meal plan update
    }
  )
  .subscribe()

// Subscribe to shopping list updates
supabase
  .channel('shopping-list-changes')
  .on('postgres_changes',
    {
      event: 'UPDATE',
      schema: 'public',
      table: 'shopping_items',
      filter: `shopping_list_id=eq.${listId}`
    },
    (payload) => {
      // Handle item purchased status change
    }
  )
  .subscribe()
```

---

## AI Integration

### Anthropic Claude Integration

#### Configuration
```typescript
// Edge Function: lib/anthropic.ts
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: Deno.env.get('ANTHROPIC_API_KEY'),
});

const MODEL = 'claude-sonnet-4-5-20250929';
const MAX_TOKENS = 4096;
```

#### Prompt Engineering Strategy

**System Prompt Template (Meal Planning):**
```
You are GoodLifeNels AI, a nutrition planning assistant deeply aligned with the "Go Back to Nature" philosophy.

Core Principles:
- Prioritize whole foods, plant-based nutrition
- Emphasize organic, non-GMO ingredients
- Include daily cold-pressed juice
- Cut refined sugars and refined carbs
- Focus on gut health and high-quality protein
- Support active lifestyles with proper macros

Top 15 Essential Foods (rotate regularly):
[List of foods]

Current Context:
- Family: 2 adults, 2 kids (ages 2-3, picky eaters)
- Week: {week_start}
- Questionnaire responses: {responses}
- Current inventory: {inventory}
- Nutrition profile: {profile}

Task: Generate a 7-day meal plan that balances preferences, nutrition goals, and practical constraints.

Output Format: JSON
{
  "meals": [ ... ],
  "shoppingList": [ ... ],
  "weeklyMacros": { ... }
}
```

**Context Management:**
- Include last 2 weeks of feedback in context
- Include nutrition profile preferences
- Include inventory for ingredient optimization
- Token budget: ~50k tokens per request (plenty of room)

#### AI Function Implementations

**1. Meal Plan Generation**
```typescript
async function generateMealPlan(input: MealPlanInput): Promise<MealPlan> {
  const systemPrompt = buildMealPlanSystemPrompt();
  const userPrompt = buildMealPlanUserPrompt(input);

  const message = await anthropic.messages.create({
    model: MODEL,
    max_tokens: MAX_TOKENS,
    system: systemPrompt,
    messages: [
      {
        role: 'user',
        content: userPrompt
      }
    ],
    temperature: 0.7, // Some creativity, but consistent
  });

  const response = JSON.parse(message.content[0].text);
  return transformToMealPlan(response);
}
```

**2. Plan B Generation**
```typescript
async function generatePlanB(input: PlanBInput): Promise<Recipe> {
  const systemPrompt = buildPlanBSystemPrompt();
  const userPrompt = `
    The user rejected this meal: ${input.rejectedMeal.name}
    Available inventory: ${JSON.stringify(input.inventory)}
    Preferences: ${JSON.stringify(input.preferences)}

    Generate an alternative ${input.mealType} recipe using available ingredients.
  `;

  const message = await anthropic.messages.create({
    model: MODEL,
    max_tokens: 2048,
    system: systemPrompt,
    messages: [{ role: 'user', content: userPrompt }],
    temperature: 0.8, // More creativity for alternatives
  });

  return JSON.parse(message.content[0].text);
}
```

**3. Daily Check-in**
```typescript
async function generateDailyCheckin(input: CheckinInput): Promise<CheckinResponse> {
  const systemPrompt = buildCheckinSystemPrompt();
  const userPrompt = `
    User: ${input.userName}
    Today's date: ${input.date}
    Today's meals: ${JSON.stringify(input.todaysMeals)}
    User's schedule: ${JSON.stringify(input.schedule)}

    Generate a friendly morning check-in with 2-3 helpful questions.
  `;

  const message = await anthropic.messages.create({
    model: MODEL,
    max_tokens: 1024,
    system: systemPrompt,
    messages: [{ role: 'user', content: userPrompt }],
    temperature: 0.6, // Consistent but personable
  });

  return JSON.parse(message.content[0].text);
}
```

**4. Kid Adaptation**
```typescript
async function adaptForKids(input: KidAdaptInput): Promise<KidFriendlyRecipe> {
  const systemPrompt = buildKidAdaptSystemPrompt();
  const userPrompt = `
    Original recipe: ${JSON.stringify(input.recipe)}
    Kid ages: ${input.kidAges.join(', ')}
    Kid preferences: ${JSON.stringify(input.kidPreferences)}

    Create kid-friendly version with creative presentation ideas and age-appropriate tasks.
  `;

  const message = await anthropic.messages.create({
    model: MODEL,
    max_tokens: 2048,
    system: systemPrompt,
    messages: [{ role: 'user', content: userPrompt }],
    temperature: 0.9, // Maximum creativity for kid engagement
  });

  return JSON.parse(message.content[0].text);
}
```

#### Token Optimization

**Strategies:**
- Cache system prompts (Anthropic supports prompt caching)
- Summarize old feedback rather than including verbatim
- Use structured output format (JSON) to reduce tokens
- Limit inventory list to relevant items for current week

**Cost Estimation:**
- Meal plan generation: ~30k input + 4k output tokens = ~$0.50/week
- Daily check-ins: ~5k input + 1k output tokens = ~$0.10/day
- Plan B: ~10k input + 2k output tokens = ~$0.15/use
- Kid adaptation: ~8k input + 2k output tokens = ~$0.12/use

**Monthly estimate (active family):** ~$30-50

---

## Apple Ecosystem Integration

### EventKit Framework (Calendar & Reminders)

#### Calendar Integration

**Permissions:**
```swift
// Request calendar access
import EventKit

let eventStore = EKEventStore()

eventStore.requestAccess(to: .event) { granted, error in
  if granted {
    // User granted permission
  }
}
```

**React Native Bridge:**
```typescript
// Using expo-calendar
import * as Calendar from 'expo-calendar';

async function requestCalendarPermissions() {
  const { status } = await Calendar.requestCalendarPermissionsAsync();
  return status === 'granted';
}

async function addMealPrepEvent(mealPrep: MealPrepEvent) {
  const defaultCalendar = await Calendar.getDefaultCalendarAsync();

  const eventId = await Calendar.createEventAsync(defaultCalendar.id, {
    title: mealPrep.title,
    startDate: mealPrep.startDate,
    endDate: mealPrep.endDate,
    notes: mealPrep.notes,
    alarms: [{ relativeOffset: -15 }], // 15 min before
  });

  return eventId;
}
```

**User Approval Flow:**
```typescript
// In-app preview before adding to calendar
function CalendarPreview({ event, onApprove, onCancel }) {
  return (
    <Modal>
      <Text>Add to Calendar?</Text>
      <EventPreview event={event} />
      <Button onPress={onApprove}>Add to Calendar</Button>
      <Button onPress={onCancel}>Cancel</Button>
    </Modal>
  );
}
```

#### Reminders Integration

**React Native Implementation:**
```typescript
// Using @react-native-community/calendar or custom native module
import { Reminders } from 'react-native-reminders';

async function createReminder(reminder: ReminderData) {
  const reminderId = await Reminders.create({
    title: reminder.title,
    notes: reminder.notes,
    dueDate: reminder.dueDate,
    priority: reminder.priority,
    location: reminder.location, // For location-based reminders
  });

  return reminderId;
}

// Location-based reminder (e.g., "Buy spinach when near store")
async function createLocationReminder(item: ShoppingItem) {
  const reminder = await Reminders.create({
    title: `Buy ${item.name}`,
    notes: `Needed for ${item.mealName}`,
    location: {
      latitude: item.store.lat,
      longitude: item.store.lng,
      radius: 200, // meters
    },
    proximity: 'enter', // Trigger when entering radius
  });

  return reminder;
}
```

#### Lists Integration (via Reminders)

**Apple Lists are Reminders Lists:**
```typescript
async function createShoppingList(list: ShoppingList) {
  // Create a new list in Reminders app
  const listId = await Reminders.createList({
    title: `GoodLifeNels - ${list.weekStart}`,
    color: 'green',
  });

  // Add items to the list
  for (const item of list.items) {
    await Reminders.createInList(listId, {
      title: item.name,
      notes: `${item.quantity} ${item.unit} - ${item.store}`,
    });
  }

  return listId;
}

// Check off item when purchased
async function markItemPurchased(reminderId: string) {
  await Reminders.complete(reminderId);

  // Also update in app database
  await supabase
    .from('shopping_items')
    .update({ purchased: true })
    .eq('reminder_id', reminderId);
}
```

#### Sync Strategy

**Bidirectional Sync:**
```typescript
// Listen for external changes (user edits in Apple apps)
useEffect(() => {
  const subscription = Reminders.addListener('reminderChanged', (event) => {
    if (event.completed) {
      // User checked off reminder in Apple Reminders
      updateInventoryFromReminder(event.reminderId);
    }
  });

  return () => subscription.remove();
}, []);

async function updateInventoryFromReminder(reminderId: string) {
  // Find corresponding shopping item
  const { data: item } = await supabase
    .from('shopping_items')
    .select('*')
    .eq('reminder_id', reminderId)
    .single();

  if (item && !item.purchased) {
    // Mark as purchased in app
    await supabase
      .from('shopping_items')
      .update({ purchased: true })
      .eq('id', item.id);

    // Add to inventory
    await addToInventory(item);
  }
}
```

---

## Authentication & Security

### Supabase Auth

**Authentication Flow:**
```typescript
// Sign up
const { data, error } = await supabase.auth.signUp({
  email: 'user@example.com',
  password: 'securePassword123',
  options: {
    data: {
      name: 'John Doe',
      role: 'adult',
    }
  }
});

// Sign in
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'securePassword123',
});

// Get current user
const { data: { user } } = await supabase.auth.getUser();

// Sign out
await supabase.auth.signOut();
```

**Session Management:**
```typescript
// Listen for auth state changes
supabase.auth.onAuthStateChange((event, session) => {
  if (event === 'SIGNED_IN') {
    // User signed in
    setUser(session.user);
  } else if (event === 'SIGNED_OUT') {
    // User signed out
    setUser(null);
  }
});

// Refresh token automatically (Supabase handles this)
// JWT tokens expire after 1 hour, auto-refresh before expiry
```

### Row-Level Security (RLS)

**PostgreSQL Policies:**

```sql
-- Users can only read their own data
CREATE POLICY "Users can view own data"
ON users FOR SELECT
USING (auth.uid() = id);

-- Family members can view family data
CREATE POLICY "Family members can view family meal plans"
ON meal_plans FOR SELECT
USING (
  family_id IN (
    SELECT family_id FROM users WHERE id = auth.uid()
  )
);

-- Only family members can create meal plans
CREATE POLICY "Family members can create meal plans"
ON meal_plans FOR INSERT
WITH CHECK (
  family_id IN (
    SELECT family_id FROM users WHERE id = auth.uid()
  )
);

-- Users can update their own questionnaire responses
CREATE POLICY "Users can update own responses"
ON questionnaire_responses FOR UPDATE
USING (user_id = auth.uid());
```

### Data Encryption

**At Rest:**
- Supabase provides encryption at rest by default
- PostgreSQL data encrypted with AES-256

**In Transit:**
- All API calls over HTTPS/TLS
- WebSocket connections (real-time) use WSS

**Sensitive Data:**
- Passwords hashed with bcrypt (Supabase Auth)
- API keys stored in environment variables
- No PII sent to Claude (anonymize if needed)

### API Security

**Rate Limiting:**
```typescript
// Supabase Edge Functions: Implement rate limiting
const RATE_LIMIT = 10; // requests per minute
const WINDOW = 60000; // 1 minute

async function checkRateLimit(userId: string): Promise<boolean> {
  const key = `rate-limit:${userId}`;
  const count = await redis.incr(key);

  if (count === 1) {
    await redis.expire(key, WINDOW / 1000);
  }

  return count <= RATE_LIMIT;
}
```

**Input Validation:**
```typescript
// Use Zod for schema validation
import { z } from 'zod';

const MealPlanInputSchema = z.object({
  questionnaireResponses: z.array(z.object({
    userId: z.string().uuid(),
    responses: z.record(z.any()),
  })),
  weekStart: z.string().date(),
  nutritionProfile: z.object({...}),
});

function validateInput(input: unknown) {
  return MealPlanInputSchema.parse(input);
}
```

---

## Notification System

### Push Notifications

**Platform:**
- iOS: APNs (Apple Push Notification service)
- Expo Notifications (wrapper for both)

**Setup:**
```typescript
// Register for push notifications
import * as Notifications from 'expo-notifications';

async function registerForPushNotifications() {
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== 'granted') {
    return null;
  }

  const token = (await Notifications.getExpoPushTokenAsync()).data;

  // Store token in database
  await supabase
    .from('users')
    .update({ push_token: token })
    .eq('id', userId);

  return token;
}
```

**Notification Handler:**
```typescript
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});
```

### Scheduled Notifications

**Backend Scheduler (Supabase Edge Functions + Cron):**

```typescript
// Edge Function: scheduled-notifications.ts
// Triggered by cron job daily at 9:00 AM

export async function handler() {
  const users = await getActiveUsers();

  for (const user of users) {
    const checkin = await generateDailyCheckin(user);

    await sendPushNotification({
      to: user.pushToken,
      title: 'Good Morning!',
      body: checkin.message,
      data: { type: 'daily-checkin', checkin },
    });
  }
}
```

**Cron Schedule (using Supabase Cron or external service like GitHub Actions):**
```yaml
# .github/workflows/daily-notifications.yml
name: Daily Notifications
on:
  schedule:
    - cron: '0 9 * * *' # 9:00 AM daily
jobs:
  trigger:
    runs-on: ubuntu-latest
    steps:
      - name: Trigger notification function
        run: |
          curl -X POST https://[project].supabase.co/functions/v1/daily-notifications \
            -H "Authorization: Bearer ${{ secrets.SUPABASE_ANON_KEY }}"
```

**Notification Types:**

1. **Saturday Questionnaire (10:00 AM)**
```typescript
{
  title: "Weekly Planning Time!",
  body: "Ready to plan this week's meals? Take the 10-minute questionnaire.",
  data: { type: 'questionnaire', weekStart: '2025-11-17' }
}
```

2. **Daily Morning Check-in (9:00 AM)**
```typescript
{
  title: "Good morning!",
  body: "Let's talk about today's meals. Do you have spinach for dinner?",
  data: { type: 'daily-checkin', date: '2025-11-17' }
}
```

3. **Evening Prep Reminder (9:00 PM)**
```typescript
{
  title: "Tomorrow Prep",
  body: "Soak quinoa tonight for tomorrow's lunch",
  data: { type: 'prep-reminder', tasks: [...] }
}
```

4. **Location-Based (Context-aware)**
```typescript
{
  title: "Reminder",
  body: "You're near Sprouts - grab organic spinach!",
  data: { type: 'shopping-reminder', item: {...} }
}
```

### Local Notifications (No Backend Required)

**For prep reminders that are time-based:**
```typescript
async function scheduleLocalNotification(reminder: PrepReminder) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: reminder.title,
      body: reminder.body,
      data: reminder.data,
    },
    trigger: {
      date: reminder.scheduledTime,
    },
  });
}
```

---

## State Management

### Zustand + React Query Architecture

**Why This Combo:**
- **Zustand:** Simple, fast global state for UI state
- **React Query:** Powerful server state management (caching, sync, mutations)
- Separation of concerns: UI state vs. server state

### Zustand Stores

**Auth Store:**
```typescript
// stores/authStore.ts
import create from 'zustand';

interface AuthState {
  user: User | null;
  session: Session | null;
  setUser: (user: User | null) => void;
  setSession: (session: Session | null) => void;
  signOut: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  session: null,
  setUser: (user) => set({ user }),
  setSession: (session) => set({ session }),
  signOut: async () => {
    await supabase.auth.signOut();
    set({ user: null, session: null });
  },
}));
```

**UI Store:**
```typescript
// stores/uiStore.ts
interface UIState {
  currentWeek: string;
  selectedDay: string;
  showPlanBModal: boolean;
  setCurrentWeek: (week: string) => void;
  setSelectedDay: (day: string) => void;
  togglePlanBModal: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  currentWeek: getCurrentWeek(),
  selectedDay: getTodayString(),
  showPlanBModal: false,
  setCurrentWeek: (week) => set({ currentWeek: week }),
  setSelectedDay: (day) => set({ selectedDay: day }),
  togglePlanBModal: () => set((state) => ({
    showPlanBModal: !state.showPlanBModal
  })),
}));
```

### React Query Hooks

**Meal Plans:**
```typescript
// hooks/useMealPlans.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export function useMealPlan(weekStart: string) {
  return useQuery({
    queryKey: ['mealPlan', weekStart],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('meal_plans')
        .select('*, planned_meals(*, recipes(*))')
        .eq('week_start', weekStart)
        .single();

      if (error) throw error;
      return data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useGenerateMealPlan() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: MealPlanInput) => {
      const response = await fetch(`${SUPABASE_URL}/functions/v1/generate-meal-plan`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(input),
      });

      return response.json();
    },
    onSuccess: (data) => {
      // Invalidate and refetch meal plan
      queryClient.invalidateQueries({ queryKey: ['mealPlan'] });
    },
  });
}
```

**Shopping Lists:**
```typescript
export function useShoppingList(mealPlanId: string) {
  return useQuery({
    queryKey: ['shoppingList', mealPlanId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('shopping_lists')
        .select('*, shopping_items(*)')
        .eq('meal_plan_id', mealPlanId)
        .single();

      if (error) throw error;
      return data;
    },
  });
}

export function useMarkItemPurchased() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ itemId, purchased }: { itemId: string; purchased: boolean }) => {
      const { error } = await supabase
        .from('shopping_items')
        .update({ purchased })
        .eq('id', itemId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['shoppingList'] });
    },
  });
}
```

**Real-Time Integration:**
```typescript
// hooks/useRealtimeMealPlan.ts
export function useRealtimeMealPlan(weekStart: string) {
  const queryClient = useQueryClient();

  useEffect(() => {
    const channel = supabase
      .channel('meal-plan-changes')
      .on('postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'meal_plans',
          filter: `week_start=eq.${weekStart}`,
        },
        () => {
          // Refetch when meal plan changes
          queryClient.invalidateQueries({ queryKey: ['mealPlan', weekStart] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [weekStart, queryClient]);

  return useMealPlan(weekStart);
}
```

---

## Error Handling

### Error Categories

1. **Network Errors** - API failures, timeouts
2. **Validation Errors** - Invalid input data
3. **Authentication Errors** - Unauthorized, expired tokens
4. **AI Errors** - Claude API failures, malformed responses
5. **Apple Integration Errors** - Permission denied, sync failures

### Error Handling Strategy

**Client-Side:**
```typescript
// utils/errorHandler.ts
export class AppError extends Error {
  constructor(
    message: string,
    public code: string,
    public userMessage: string,
    public retry?: () => Promise<void>
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export function handleError(error: unknown): AppError {
  if (error instanceof AppError) {
    return error;
  }

  if (error instanceof Error) {
    // Supabase error
    if ('code' in error && error.code === 'PGRST116') {
      return new AppError(
        error.message,
        'NOT_FOUND',
        'The requested item was not found.'
      );
    }

    // Network error
    if (error.message.includes('fetch')) {
      return new AppError(
        error.message,
        'NETWORK_ERROR',
        'Connection failed. Please check your internet and try again.'
      );
    }
  }

  // Unknown error
  return new AppError(
    'Unknown error',
    'UNKNOWN',
    'Something went wrong. Please try again.'
  );
}
```

**React Error Boundary:**
```typescript
// components/ErrorBoundary.tsx
export class ErrorBoundary extends React.Component<Props, State> {
  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log to error tracking service
    Sentry.captureException(error, { contexts: { react: errorInfo } });
  }

  render() {
    if (this.state.hasError) {
      return (
        <ErrorFallback
          error={this.state.error}
          resetError={() => this.setState({ hasError: false })}
        />
      );
    }

    return this.props.children;
  }
}
```

**React Query Error Handling:**
```typescript
// Global error handler
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      onError: (error) => {
        const appError = handleError(error);
        showToast({
          type: 'error',
          message: appError.userMessage,
        });
      },
      retry: (failureCount, error) => {
        // Don't retry on auth errors
        if (error.code === 'UNAUTHORIZED') return false;
        // Retry network errors up to 3 times
        return failureCount < 3;
      },
    },
  },
});
```

**AI Error Handling:**
```typescript
// Edge Function: Error handling for Claude API
async function generateMealPlanWithRetry(input: MealPlanInput, retries = 3): Promise<MealPlan> {
  try {
    const response = await anthropic.messages.create({...});
    return JSON.parse(response.content[0].text);
  } catch (error) {
    if (retries > 0 && error.status === 529) {
      // Overloaded, retry with backoff
      await sleep(2000 * (4 - retries));
      return generateMealPlanWithRetry(input, retries - 1);
    }

    if (error.status === 400) {
      // Bad request, don't retry
      throw new AppError(
        error.message,
        'AI_VALIDATION_ERROR',
        'Invalid meal plan input. Please try again.'
      );
    }

    throw new AppError(
      error.message,
      'AI_ERROR',
      'AI service temporarily unavailable. Please try again later.'
    );
  }
}
```

---

## Performance Considerations

### Frontend Optimization

**1. Code Splitting (Web):**
```typescript
// Next.js dynamic imports
const MealPlanGenerator = dynamic(() => import('@/components/MealPlanGenerator'), {
  loading: () => <Skeleton />,
  ssr: false, // Don't server-render heavy components
});
```

**2. Image Optimization:**
```typescript
// React Native: Use cached images
import FastImage from 'react-native-fast-image';

<FastImage
  source={{ uri: recipe.imageUrl, priority: FastImage.priority.normal }}
  resizeMode={FastImage.resizeMode.cover}
  style={styles.image}
/>

// Web: Use Next.js Image
import Image from 'next/image';

<Image
  src={recipe.imageUrl}
  alt={recipe.name}
  width={300}
  height={200}
  loading="lazy"
/>
```

**3. List Virtualization:**
```typescript
// React Native
import { FlashList } from '@shopify/flash-list';

<FlashList
  data={recipes}
  renderItem={({ item }) => <RecipeCard recipe={item} />}
  estimatedItemSize={150}
/>
```

**4. Memoization:**
```typescript
// Expensive computations
const weeklyMacros = useMemo(() => {
  return calculateWeeklyMacros(mealPlan);
}, [mealPlan]);

// Callbacks
const handleMealSelect = useCallback((mealId: string) => {
  setSelectedMeal(mealId);
}, []);
```

### Backend Optimization

**1. Database Indexing:**
```sql
-- Index for frequent queries
CREATE INDEX idx_meal_plans_family_week
ON meal_plans(family_id, week_start);

CREATE INDEX idx_shopping_items_list_purchased
ON shopping_items(shopping_list_id, purchased);

CREATE INDEX idx_inventory_expiration
ON inventory(family_id, expiration_date);
```

**2. Query Optimization:**
```typescript
// Fetch related data in single query
const { data } = await supabase
  .from('meal_plans')
  .select(`
    *,
    planned_meals(
      *,
      recipes(*)
    )
  `)
  .eq('week_start', weekStart)
  .single();

// Use count instead of fetching all rows
const { count } = await supabase
  .from('recipes')
  .select('*', { count: 'exact', head: true })
  .eq('category', 'breakfast');
```

**3. Caching Strategy:**
```typescript
// React Query cache
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 30 * 60 * 1000, // 30 minutes
    },
  },
});

// Edge Function caching (for AI responses)
const CACHE_TTL = 60 * 60; // 1 hour

async function getCachedMealPlan(cacheKey: string) {
  const cached = await kv.get(cacheKey);
  if (cached) return JSON.parse(cached);
  return null;
}

async function setCachedMealPlan(cacheKey: string, mealPlan: MealPlan) {
  await kv.setex(cacheKey, CACHE_TTL, JSON.stringify(mealPlan));
}
```

### AI Cost Optimization

**1. Prompt Caching (Anthropic):**
```typescript
// Use Claude's prompt caching for repeated context
const message = await anthropic.messages.create({
  model: MODEL,
  max_tokens: 4096,
  system: [
    {
      type: "text",
      text: NUTRITION_PHILOSOPHY, // Static, will be cached
      cache_control: { type: "ephemeral" }
    },
    {
      type: "text",
      text: TOP_15_FOODS, // Static, will be cached
      cache_control: { type: "ephemeral" }
    },
    {
      type: "text",
      text: `User preferences: ${JSON.stringify(preferences)}` // Dynamic
    }
  ],
  messages: [...]
});
```

**2. Response Reuse:**
```typescript
// Cache similar meal plan requests
function generateCacheKey(input: MealPlanInput): string {
  return `meal-plan:${input.weekStart}:${hashPreferences(input)}`;
}

// If preferences haven't changed significantly, reuse previous plan
```

---

## Testing Strategy

### Testing Pyramid

```
        /\
       /  \
      / E2E \      <- Few, critical user flows
     /______\
    /        \
   /  Integ.  \    <- API, database, AI integration
  /___________\
 /             \
/   Unit Tests  \  <- Many, fast, isolated
/_______________\
```

### Unit Tests

**Framework:** Jest + React Testing Library

```typescript
// __tests__/utils/macroCalculator.test.ts
import { calculateDailyMacros } from '@/utils/macroCalculator';

describe('calculateDailyMacros', () => {
  it('should calculate correct macros for meal plan', () => {
    const meals = [
      { protein: 30, carbs: 40, fats: 15 },
      { protein: 25, carbs: 35, fats: 10 },
      { protein: 35, carbs: 50, fats: 20 },
    ];

    const result = calculateDailyMacros(meals);

    expect(result).toEqual({
      protein: 90,
      carbs: 125,
      fats: 45,
      calories: expect.any(Number),
    });
  });
});
```

**Component Tests:**
```typescript
// __tests__/components/MealCard.test.tsx
import { render, fireEvent } from '@testing-library/react-native';
import { MealCard } from '@/components/MealCard';

describe('MealCard', () => {
  it('should render meal information', () => {
    const meal = {
      name: 'Quinoa Bowl',
      prepTime: 20,
      macros: { protein: 25, carbs: 40, fats: 12 },
    };

    const { getByText } = render(<MealCard meal={meal} />);

    expect(getByText('Quinoa Bowl')).toBeTruthy();
    expect(getByText('20 min')).toBeTruthy();
  });

  it('should call onPlanB when Plan B button pressed', () => {
    const onPlanB = jest.fn();
    const { getByText } = render(<MealCard meal={meal} onPlanB={onPlanB} />);

    fireEvent.press(getByText('Plan B'));

    expect(onPlanB).toHaveBeenCalledWith(meal.id);
  });
});
```

### Integration Tests

**API Tests:**
```typescript
// __tests__/api/mealPlans.test.ts
import { createClient } from '@supabase/supabase-js';

describe('Meal Plans API', () => {
  let supabase;

  beforeAll(() => {
    supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
  });

  it('should create meal plan and shopping list', async () => {
    const { data: mealPlan } = await supabase
      .from('meal_plans')
      .insert({
        family_id: TEST_FAMILY_ID,
        week_start: '2025-11-17',
      })
      .select()
      .single();

    expect(mealPlan).toBeDefined();
    expect(mealPlan.week_start).toBe('2025-11-17');

    // Verify shopping list was auto-created
    const { data: shoppingList } = await supabase
      .from('shopping_lists')
      .select()
      .eq('meal_plan_id', mealPlan.id)
      .single();

    expect(shoppingList).toBeDefined();
  });
});
```

**AI Integration Tests:**
```typescript
// __tests__/ai/mealPlanGeneration.test.ts
describe('AI Meal Plan Generation', () => {
  it('should generate valid meal plan from questionnaire', async () => {
    const input = {
      questionnaireResponses: [TEST_RESPONSE_1, TEST_RESPONSE_2],
      nutritionProfile: TEST_NUTRITION_PROFILE,
      inventory: TEST_INVENTORY,
      weekStart: '2025-11-17',
    };

    const mealPlan = await generateMealPlan(input);

    expect(mealPlan.meals).toHaveLength(7);
    expect(mealPlan.meals[0]).toMatchObject({
      day: expect.any(String),
      breakfast: expect.objectContaining({
        name: expect.any(String),
        macros: expect.any(Object),
      }),
    });
  });

  it('should respect dietary preferences', async () => {
    const input = {
      ...TEST_INPUT,
      nutritionProfile: {
        ...TEST_NUTRITION_PROFILE,
        avoidFoods: ['dairy'],
      },
    };

    const mealPlan = await generateMealPlan(input);

    // Verify no dairy in meal plan
    const allIngredients = mealPlan.meals.flatMap(m =>
      [m.breakfast, m.lunch, m.dinner].flatMap(meal => meal.ingredients)
    );

    expect(allIngredients.some(i => i.includes('cheese'))).toBe(false);
  });
});
```

### E2E Tests

**Framework:** Detox (React Native) or Playwright (Web)

```typescript
// e2e/weeklyPlanning.test.ts
describe('Weekly Planning Flow', () => {
  it('should complete full planning cycle', async () => {
    // 1. Open app
    await device.launchApp();

    // 2. Navigate to questionnaire
    await element(by.id('questionnaire-button')).tap();

    // 3. Complete questionnaire
    await element(by.id('craving-tacos')).tap();
    await element(by.id('energy-high')).tap();
    await element(by.id('submit-questionnaire')).tap();

    // 4. Wait for meal plan generation
    await waitFor(element(by.id('meal-plan-ready')))
      .toBeVisible()
      .withTimeout(30000);

    // 5. Verify meal plan displayed
    await expect(element(by.id('monday-breakfast'))).toBeVisible();

    // 6. Add to calendar
    await element(by.id('add-to-calendar')).tap();
    await element(by.id('approve-calendar')).tap();

    // 7. Verify success
    await expect(element(by.text('Added to Calendar'))).toBeVisible();
  });
});
```

### Test Coverage Goals

- **Unit Tests:** 80%+ coverage
- **Integration Tests:** Critical API paths
- **E2E Tests:** 5-10 critical user flows

---

## Development Environment Setup

### Prerequisites

```bash
# Node.js 18+
node --version

# npm or yarn
npm --version

# Expo CLI (for React Native)
npm install -g expo-cli

# Supabase CLI
npm install -g supabase

# iOS development (Mac only)
xcode-select --install
```

### Project Setup

```bash
# Clone repository
git clone <repo-url>
cd GoodLifeNels

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your keys

# Start Supabase locally (optional for development)
supabase start

# Run migrations
supabase db push

# Start development servers
npm run dev:mobile  # React Native
npm run dev:web     # Next.js
```

### Environment Variables

```bash
# .env.local
NEXT_PUBLIC_SUPABASE_URL=https://[project-id].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
ANTHROPIC_API_KEY=your-anthropic-key

# Optional
SENTRY_DSN=your-sentry-dsn
EXPO_PUBLIC_API_URL=http://localhost:54321
```

---

**Document Status:** Complete technical specification
**Next Steps:**
1. Review database schema (DATABASE_SCHEMA.md)
2. Review development phases (DEVELOPMENT_PHASES.md)
3. Review AI prompts (AI_PROMPT_LIBRARY.md)
4. Set up development environment
5. Begin Phase 1 implementation
