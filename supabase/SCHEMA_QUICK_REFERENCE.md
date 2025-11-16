# Database Schema Quick Reference

Quick lookup for GoodLifeNels database schema.

## Table Relationships

```
users (auth)
  └── family_profiles (1:N via created_by)
       └── family_members (1:N)
            ├── nutrition_profiles (1:1)
            │    ├── food_frequency_rules (1:N)
            │    └── macro_targets (1:N)
            ├── meal_plans (1:N)
            │    ├── planned_meals (1:N)
            │    ├── shopping_lists (1:1)
            │    │    └── shopping_items (1:N)
            │    └── juice_plans (1:N)
            └── inventory (1:N)

recipes (standalone, referenced by planned_meals)
questionnaire_responses (user + family)
meal_feedback (user + planned_meal)
user_preferences (user)
```

## Key Tables & Fields

### users
- `id` (UUID, PK)
- `email` (TEXT, unique)
- `name` (TEXT)
- `push_token` (TEXT) - Expo notifications

### family_profiles
- `id` (UUID, PK)
- `name` (TEXT)
- `created_by` (UUID, FK → users.id)

### family_members
- `id` (UUID, PK)
- `family_id` (UUID, FK → family_profiles.id)
- `user_id` (UUID, FK → users.id) - NULL for children
- `role` ('adult' | 'child')
- `name` (TEXT) - For children
- `age` (INT) - For children
- `dietary_restrictions` (TEXT[])

### recipes
- `id` (UUID, PK)
- `name` (TEXT)
- `source` ('curated' | 'ai-generated' | 'user-created')
- `meal_type` (TEXT[]) - ['breakfast', 'lunch', 'dinner', 'snack', 'juice', 'smoothie']
- `macros` (JSONB) - {protein, carbs, fats, fiber, calories}
- `ingredients` (JSONB[]) - [{name, quantity, unit, category}]
- `instructions` (TEXT[])
- `tags` (TEXT[])
- `top_15_foods` (TEXT[]) - Which superfoods included
- `kid_friendly` (BOOLEAN)
- `times_used` (INT) - Auto-incremented
- `avg_rating` (DECIMAL) - Auto-calculated
- `deleted_at` (TIMESTAMPTZ) - Soft delete

### meal_plans
- `id` (UUID, PK)
- `family_id` (UUID, FK → family_profiles.id)
- `week_start` (DATE) - Monday
- `week_end` (DATE) - Sunday
- `status` ('draft' | 'active' | 'completed' | 'archived')
- `weekly_macros` (JSONB)

### planned_meals
- `id` (UUID, PK)
- `meal_plan_id` (UUID, FK → meal_plans.id)
- `recipe_id` (UUID, FK → recipes.id)
- `day_of_week` ('Monday' | 'Tuesday' | ... | 'Sunday')
- `meal_type` ('breakfast' | 'lunch' | 'dinner' | 'snack' | 'juice' | 'smoothie')
- `meal_name` (TEXT)
- `macros` (JSONB)
- `ingredients` (JSONB[])
- `is_fasting` (BOOLEAN)

### shopping_lists
- `id` (UUID, PK)
- `meal_plan_id` (UUID, FK → meal_plans.id)
- `family_id` (UUID, FK → family_profiles.id)
- `status` ('pending' | 'in_progress' | 'completed')
- `total_items` (INT) - Auto-calculated
- `purchased_items` (INT) - Auto-calculated
- `apple_list_id` (TEXT) - Apple Reminders sync

### shopping_items
- `id` (UUID, PK)
- `shopping_list_id` (UUID, FK → shopping_lists.id)
- `name` (TEXT)
- `quantity` (DECIMAL)
- `unit` (TEXT)
- `category` (TEXT)
- `suggested_store` (TEXT) - 'Costco', 'Sprouts', etc.
- `purchased` (BOOLEAN)
- `apple_reminder_id` (TEXT)

### nutrition_profiles
- `id` (UUID, PK)
- `family_id` (UUID, FK → family_profiles.id)
- `philosophy` (TEXT) - Default: 'Go Back to Nature'
- `dietary_style` (TEXT[])
- `daily_juice_required` (BOOLEAN)
- `allow_fasting` (BOOLEAN)
- `allow_ketosis` (BOOLEAN)

### macro_targets
- `id` (UUID, PK)
- `nutrition_profile_id` (UUID, FK → nutrition_profiles.id)
- `target_type` ('baseline' | 'training_day' | 'rest_day' | 'fasting')
- `protein_min/max` (INT)
- `carbs_min/max` (INT)
- `fats_min/max` (INT)
- `fiber_min` (INT)
- `calories_min/max` (INT)

## Top 15 Superfoods

1. **Broccoli sprouts** - Sulforaphane (cancer-fighting)
2. **Turmeric** - Curcumin (anti-inflammatory)
3. **Blueberries** - Anthocyanins (brain health)
4. **Broccoli** - Sulforaphane + fiber
5. **Flaxseed** - Omega-3 ALA, lignans
6. **Dark leafy greens** - Kale, spinach, chard
7. **Garlic** - Allicin (immune)
8. **Mushrooms** - Beta-glucans (immunity)
9. **Cacao** - Flavonoids (heart/brain)
10. **Tigernuts** - Prebiotic fiber (gut)
11. **Ginger root** - Gingerol (anti-inflammatory)
12. **Grapes** - Resveratrol (longevity)
13. **Tomatoes** - Lycopene (heart)
14. **Lemon** - Vitamin C, alkalizing
15. **Quinoa** - Complete protein, fiber

## Database Functions

### Automatic Triggers
- `update_updated_at_column()` - Updates `updated_at` on all tables
- `create_shopping_list_for_meal_plan()` - Auto-creates shopping list when meal plan created
- `update_shopping_list_counters()` - Updates total_items/purchased_items counts
- `add_purchased_item_to_inventory()` - Adds purchased items to inventory (optional)
- `increment_recipe_usage()` - Increments `times_used` when recipe added to meal plan
- `update_recipe_rating()` - Calculates `avg_rating` from meal feedback

## Indexes

### Performance Indexes
- GIN indexes on JSONB fields (macros, responses)
- GIN indexes on array fields (tags, meal_type, top_15_foods)
- Full-text search on recipes (name, description)
- B-tree indexes on foreign keys
- Composite indexes on frequently queried combinations

### Key Composite Indexes
- `meal_plans(family_id, week_start)`
- `planned_meals(meal_plan_id, day_of_week)`
- `shopping_lists(family_id, week_start)`
- `inventory(family_id, expiration_date)`

## RLS Policies

### Pattern: Family-based access
Most tables use this pattern:
```sql
USING (
  family_id IN (
    SELECT family_id FROM family_members WHERE user_id = auth.uid()
  )
)
```

### Special Cases
- **users**: Can only view/edit own data
- **recipes**: Anyone can view curated, only creator can edit own
- **questionnaire_responses**: User can view own + family's
- **meal_feedback**: User can only view/create own

## Common Queries

### Get current week's meal plan
```sql
SELECT * FROM meal_plans
WHERE family_id = 'family-uuid'
  AND week_start = '2025-11-17';
```

### Get all meals for a plan
```sql
SELECT * FROM planned_meals
WHERE meal_plan_id = 'plan-uuid'
ORDER BY
  CASE day_of_week
    WHEN 'Monday' THEN 1
    WHEN 'Tuesday' THEN 2
    -- etc
  END,
  CASE meal_type
    WHEN 'breakfast' THEN 1
    WHEN 'juice' THEN 2
    WHEN 'lunch' THEN 3
    WHEN 'snack' THEN 4
    WHEN 'dinner' THEN 5
  END;
```

### Get shopping list organized by store
```sql
SELECT suggested_store, json_agg(si.*) as items
FROM shopping_items si
WHERE shopping_list_id = 'list-uuid'
GROUP BY suggested_store;
```

### Find expiring inventory
```sql
SELECT * FROM inventory
WHERE family_id = 'family-uuid'
  AND expiration_date BETWEEN CURRENT_DATE AND CURRENT_DATE + INTERVAL '3 days'
ORDER BY expiration_date;
```

### Search recipes by top 15 food
```sql
SELECT * FROM recipes
WHERE 'Broccoli sprouts' = ANY(top_15_foods)
  AND deleted_at IS NULL;
```

### Get top-rated recipes
```sql
SELECT name, avg_rating, times_used
FROM recipes
WHERE deleted_at IS NULL
  AND avg_rating >= 4.0
ORDER BY avg_rating DESC, times_used DESC
LIMIT 20;
```

## JSONB Structures

### macros
```json
{
  "protein": 30,
  "carbs": 45,
  "fats": 15,
  "fiber": 12,
  "calories": 420
}
```

### ingredients (array of objects)
```json
[
  {
    "name": "Organic Spinach",
    "quantity": 2,
    "unit": "cups",
    "category": "produce"
  }
]
```

### questionnaire responses
```json
{
  "cravings": ["tacos", "salmon"],
  "energyLevel": "high",
  "workoutSchedule": {
    "Monday": "strength",
    "intensity": "high"
  },
  "fastingPlans": ["Tuesday-IF"],
  "previousWeekFeedback": {
    "kidsLoved": ["quinoa bowl"],
    "kidsRejected": ["cauliflower rice"]
  }
}
```

## Migration Commands

```bash
# Local development
supabase start              # Start local Supabase
supabase db reset          # Reset DB + run migrations
supabase db diff           # Show schema diff

# Production
supabase link              # Link to remote project
supabase db push           # Push migrations
supabase db remote-url     # Get connection string

# Types generation
supabase gen types typescript --local > src/types/database.types.ts
```

## Environment Variables

```bash
# .env.local
SUPABASE_URL=http://127.0.0.1:54321
SUPABASE_ANON_KEY=eyJ...
OPENAI_API_KEY=sk-...
```

---

**Quick Links:**
- [Full Schema Documentation](../docs/DATABASE_SCHEMA.md)
- [Supabase README](./README.md)
- [Seed Data](./seed.sql)
- [Initial Migration](./migrations/001_initial_schema.sql)
