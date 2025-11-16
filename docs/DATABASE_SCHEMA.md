# GoodLifeNels - Database Schema

**Version:** 1.0
**Last Updated:** November 15, 2025
**Database:** PostgreSQL 15+ (Supabase)

---

## Table of Contents
1. [Overview](#overview)
2. [Entity Relationship Diagram](#entity-relationship-diagram)
3. [Table Definitions](#table-definitions)
4. [Indexes](#indexes)
5. [Row-Level Security Policies](#row-level-security-policies)
6. [Database Functions](#database-functions)
7. [Triggers](#triggers)
8. [Migration Strategy](#migration-strategy)

---

## Overview

### Database Design Principles

1. **Relational Model:** Leverage PostgreSQL's strengths for complex relationships
2. **Normalization:** 3NF for data integrity, strategic denormalization for performance
3. **Audit Trail:** Track creation/update timestamps on all tables
4. **Soft Deletes:** Use `deleted_at` for important data (meals, recipes)
5. **UUID Primary Keys:** For distributed systems and security
6. **Row-Level Security:** Multi-tenant data isolation at database level

---

## Entity Relationship Diagram

```
┌─────────────┐
│    users    │
└──────┬──────┘
       │
       │ 1:N
       ▼
┌─────────────────┐          ┌──────────────────┐
│ family_profiles │◄─────────┤  family_members  │
└────────┬────────┘   N:1    └──────────────────┘
         │
         │ 1:N
         ▼
┌─────────────────┐
│   meal_plans    │
└────────┬────────┘
         │ 1:N
         ├──────────────────┬──────────────────┐
         ▼                  ▼                  ▼
┌──────────────┐  ┌──────────────────┐  ┌─────────────┐
│ planned_meals│  │  shopping_lists  │  │  juice_plans│
└──────┬───────┘  └────────┬─────────┘  └─────────────┘
       │ N:1              │ 1:N
       │                  ▼
       │          ┌──────────────────┐
       │          │  shopping_items  │
       │          └──────────────────┘
       ▼
┌─────────────┐
│   recipes   │
└─────────────┘

┌─────────────────────────┐
│ questionnaire_responses │
└─────────────────────────┘

┌─────────────────┐
│  meal_feedback  │
└─────────────────┘

┌─────────────────────┐          ┌──────────────────────┐
│ nutrition_profiles  │◄─────────┤ food_frequency_rules │
└─────────────────────┘   1:N    └──────────────────────┘
         │ 1:N
         ▼
┌─────────────────┐
│  macro_targets  │
└─────────────────┘

┌─────────────┐
│  inventory  │
└─────────────┘

┌──────────────────┐
│  user_preferences│
└──────────────────┘
```

---

## Table Definitions

### 1. users

**Purpose:** Adult family members who use the app

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  avatar_url TEXT,
  push_token TEXT, -- For notifications
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Trigger to update updated_at
CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
```

**Notes:**
- Syncs with Supabase Auth (auth.users)
- `push_token` stores Expo push notification token

---

### 2. family_profiles

**Purpose:** Represents a family unit

```sql
CREATE TABLE family_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL, -- e.g., "The Nels Family"
  created_by UUID REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

### 3. family_members

**Purpose:** Links users to families (supports multi-family if needed)

```sql
CREATE TABLE family_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  family_id UUID REFERENCES family_profiles(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('adult', 'child')),
  name TEXT, -- For children (who don't have user accounts)
  age INT, -- For children
  dietary_restrictions TEXT[], -- Array of restrictions
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(family_id, user_id)
);

-- Index for fast family lookups
CREATE INDEX idx_family_members_family ON family_members(family_id);
CREATE INDEX idx_family_members_user ON family_members(user_id);
```

**Notes:**
- Adults: `user_id` is set, `name` is null (use users.name)
- Children: `user_id` is null, `name` and `age` are set
- `dietary_restrictions`: e.g., `['dairy', 'nuts']`

---

### 4. meal_plans

**Purpose:** Weekly meal plans

```sql
CREATE TABLE meal_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  family_id UUID REFERENCES family_profiles(id) ON DELETE CASCADE,
  week_start DATE NOT NULL, -- Monday of the week
  week_end DATE NOT NULL, -- Sunday of the week
  status TEXT DEFAULT 'active' CHECK (status IN ('draft', 'active', 'completed', 'archived')),
  weekly_macros JSONB, -- Aggregated macros for the week
  generated_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(family_id, week_start)
);

CREATE INDEX idx_meal_plans_family_week ON meal_plans(family_id, week_start);
```

**weekly_macros structure:**
```json
{
  "protein": 630,
  "carbs": 875,
  "fats": 315,
  "fiber": 210,
  "calories": 9450
}
```

---

### 5. planned_meals

**Purpose:** Individual meals within a meal plan

```sql
CREATE TABLE planned_meals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  meal_plan_id UUID REFERENCES meal_plans(id) ON DELETE CASCADE,
  recipe_id UUID REFERENCES recipes(id) ON DELETE SET NULL,
  day_of_week TEXT NOT NULL CHECK (day_of_week IN ('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday')),
  meal_type TEXT NOT NULL CHECK (meal_type IN ('breakfast', 'lunch', 'dinner', 'snack', 'juice', 'smoothie')),
  meal_name TEXT NOT NULL,
  serving_size INT DEFAULT 1,
  macros JSONB, -- Nutritional breakdown
  ingredients JSONB[], -- Array of ingredient objects
  instructions TEXT[],
  prep_time INT, -- minutes
  cook_time INT, -- minutes
  kid_friendly_notes TEXT, -- Adaptations for kids
  age_appropriate_tasks TEXT[], -- Tasks for kids
  is_fasting BOOLEAN DEFAULT FALSE, -- If this is a fasting meal (skipped)
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_planned_meals_plan ON planned_meals(meal_plan_id);
CREATE INDEX idx_planned_meals_day ON planned_meals(meal_plan_id, day_of_week);
```

**macros structure:**
```json
{
  "protein": 30,
  "carbs": 45,
  "fats": 15,
  "fiber": 12,
  "calories": 420
}
```

**ingredients structure:**
```json
[
  {
    "name": "Organic Spinach",
    "quantity": 2,
    "unit": "cups",
    "category": "produce"
  },
  {
    "name": "Quinoa",
    "quantity": 1,
    "unit": "cup",
    "category": "grains"
  }
]
```

---

### 6. recipes

**Purpose:** Recipe database (curated + AI-generated)

```sql
CREATE TABLE recipes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  source TEXT, -- 'curated', 'ai-generated', 'user-created'
  meal_type TEXT[] NOT NULL, -- ['breakfast', 'lunch'], etc.
  prep_time INT, -- minutes
  cook_time INT,
  servings INT DEFAULT 2,
  macros JSONB,
  ingredients JSONB[] NOT NULL,
  instructions TEXT[] NOT NULL,
  tags TEXT[], -- ['vegan', 'gluten-free', 'quick', etc.]
  top_15_foods TEXT[], -- Which top 15 foods this includes
  kid_friendly BOOLEAN DEFAULT FALSE,
  kid_adaptations TEXT,
  difficulty TEXT CHECK (difficulty IN ('easy', 'medium', 'hard')),
  created_by UUID REFERENCES users(id) ON DELETE SET NULL,
  is_favorite BOOLEAN DEFAULT FALSE,
  times_used INT DEFAULT 0,
  avg_rating DECIMAL(3,2),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  deleted_at TIMESTAMPTZ -- Soft delete
);

-- Indexes for search
CREATE INDEX idx_recipes_meal_type ON recipes USING GIN(meal_type);
CREATE INDEX idx_recipes_tags ON recipes USING GIN(tags);
CREATE INDEX idx_recipes_top_15 ON recipes USING GIN(top_15_foods);
CREATE INDEX idx_recipes_name_search ON recipes USING GIN(to_tsvector('english', name));

-- Active recipes only (not deleted)
CREATE INDEX idx_recipes_active ON recipes(id) WHERE deleted_at IS NULL;
```

---

### 7. shopping_lists

**Purpose:** Shopping lists generated from meal plans

```sql
CREATE TABLE shopping_lists (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  meal_plan_id UUID REFERENCES meal_plans(id) ON DELETE CASCADE,
  family_id UUID REFERENCES family_profiles(id) ON DELETE CASCADE,
  week_start DATE NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed')),
  total_items INT DEFAULT 0,
  purchased_items INT DEFAULT 0,
  apple_list_id TEXT, -- Reference to Apple Reminders list
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(meal_plan_id)
);

CREATE INDEX idx_shopping_lists_family_week ON shopping_lists(family_id, week_start);
```

---

### 8. shopping_items

**Purpose:** Individual items in shopping list

```sql
CREATE TABLE shopping_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  shopping_list_id UUID REFERENCES shopping_lists(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  quantity DECIMAL(10,2),
  unit TEXT,
  category TEXT, -- 'produce', 'dairy', 'meat', 'grains', etc.
  suggested_store TEXT, -- 'Costco', 'Sprouts', etc.
  priority TEXT DEFAULT 'normal' CHECK (priority IN ('high', 'normal', 'low')),
  purchased BOOLEAN DEFAULT FALSE,
  purchased_at TIMESTAMPTZ,
  apple_reminder_id TEXT, -- Reference to Apple Reminder
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_shopping_items_list ON shopping_items(shopping_list_id);
CREATE INDEX idx_shopping_items_purchased ON shopping_items(shopping_list_id, purchased);
CREATE INDEX idx_shopping_items_store ON shopping_items(suggested_store);
```

---

### 9. inventory

**Purpose:** Current ingredient inventory

```sql
CREATE TABLE inventory (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  family_id UUID REFERENCES family_profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  quantity DECIMAL(10,2),
  unit TEXT,
  category TEXT,
  purchase_date DATE DEFAULT CURRENT_DATE,
  expiration_date DATE,
  location TEXT, -- 'fridge', 'freezer', 'pantry'
  is_organic BOOLEAN DEFAULT FALSE,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_inventory_family ON inventory(family_id);
CREATE INDEX idx_inventory_expiration ON inventory(family_id, expiration_date);
CREATE INDEX idx_inventory_name ON inventory(family_id, name);
```

---

### 10. questionnaire_responses

**Purpose:** Weekly questionnaire responses

```sql
CREATE TABLE questionnaire_responses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  family_id UUID REFERENCES family_profiles(id) ON DELETE CASCADE,
  week_start DATE NOT NULL,
  responses JSONB NOT NULL, -- Flexible question/answer storage
  completed_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_questionnaire_user_week ON questionnaire_responses(user_id, week_start);
CREATE INDEX idx_questionnaire_family_week ON questionnaire_responses(family_id, week_start);
```

**responses structure (example):**
```json
{
  "cravings": ["tacos", "salmon", "pasta"],
  "energyLevel": "high",
  "workoutSchedule": {
    "Monday": "strength",
    "Wednesday": "cardio",
    "Friday": "strength",
    "intensity": "high"
  },
  "socialEvents": [
    { "day": "Saturday", "event": "dinner party" }
  ],
  "workSchedule": {
    "Monday": { "start": "9:00", "end": "17:00", "cooking": true },
    "Tuesday": { "start": "9:00", "end": "19:00", "cooking": false }
  },
  "fastingPlans": ["Tuesday-IF", "Thursday-juice-only"],
  "previousWeekFeedback": {
    "kidsLoved": ["quinoa bowl", "berry smoothie"],
    "kidsRejected": ["cauliflower rice"],
    "timeConstraints": "needed quicker lunches"
  },
  "openEnded": "This week focus on easy prep, very busy at work"
}
```

---

### 11. meal_feedback

**Purpose:** Feedback on individual meals

```sql
CREATE TABLE meal_feedback (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  planned_meal_id UUID REFERENCES planned_meals(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  rating INT CHECK (rating >= 1 AND rating <= 5),
  kid_rating INT CHECK (kid_rating >= 1 AND kid_rating <= 5),
  kid_acceptance TEXT CHECK (kid_acceptance IN ('loved', 'liked', 'neutral', 'disliked', 'refused')),
  actual_prep_time INT, -- minutes (vs estimated)
  would_make_again BOOLEAN,
  comments TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_meal_feedback_meal ON meal_feedback(planned_meal_id);
CREATE INDEX idx_meal_feedback_user ON meal_feedback(user_id);
```

---

### 12. nutrition_profiles

**Purpose:** Family nutrition goals and preferences

```sql
CREATE TABLE nutrition_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  family_id UUID REFERENCES family_profiles(id) ON DELETE CASCADE,
  philosophy TEXT DEFAULT 'Go Back to Nature',
  dietary_style TEXT[], -- ['plant-based', 'organic', 'non-gmo']
  daily_juice_required BOOLEAN DEFAULT TRUE,
  avoid_foods TEXT[], -- ['refined-sugar', 'processed-carbs']
  emphasize_foods TEXT[], -- ['whole-foods', 'high-fiber']
  allow_fasting BOOLEAN DEFAULT TRUE,
  allow_ketosis BOOLEAN DEFAULT TRUE,
  active_lifestyle BOOLEAN DEFAULT TRUE,
  gut_health_focus BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(family_id)
);
```

---

### 13. food_frequency_rules

**Purpose:** Define how often specific foods should appear

```sql
CREATE TABLE food_frequency_rules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nutrition_profile_id UUID REFERENCES nutrition_profiles(id) ON DELETE CASCADE,
  food_name TEXT NOT NULL,
  frequency_days INT NOT NULL, -- 1 = daily, 3 = every 3 days, etc.
  is_top_15 BOOLEAN DEFAULT FALSE,
  priority TEXT DEFAULT 'normal' CHECK (priority IN ('required', 'high', 'normal', 'low')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_food_frequency_profile ON food_frequency_rules(nutrition_profile_id);
CREATE INDEX idx_food_frequency_top15 ON food_frequency_rules(nutrition_profile_id, is_top_15);
```

**Example rows:**
```sql
INSERT INTO food_frequency_rules (nutrition_profile_id, food_name, frequency_days, is_top_15, priority) VALUES
  ('profile-uuid', 'Dark leafy greens', 1, true, 'required'),
  ('profile-uuid', 'Blueberries', 1, true, 'high'),
  ('profile-uuid', 'Salmon', 3, false, 'high'),
  ('profile-uuid', 'Broccoli sprouts', 2, true, 'high');
```

---

### 14. macro_targets

**Purpose:** Daily macro targets (can vary by day/activity)

```sql
CREATE TABLE macro_targets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nutrition_profile_id UUID REFERENCES nutrition_profiles(id) ON DELETE CASCADE,
  target_type TEXT NOT NULL CHECK (target_type IN ('baseline', 'training_day', 'rest_day', 'fasting')),
  protein_min INT, -- grams
  protein_max INT,
  carbs_min INT,
  carbs_max INT,
  fats_min INT,
  fats_max INT,
  fiber_min INT,
  calories_min INT,
  calories_max INT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_macro_targets_profile ON macro_targets(nutrition_profile_id);
```

**Example rows:**
```sql
-- Baseline (moderate activity)
(profile_id, 'baseline', 90, 120, 120, 150, 40, 60, 30, 1800, 2200)

-- Training day (high intensity)
(profile_id, 'training_day', 120, 150, 150, 200, 50, 70, 35, 2200, 2600)

-- Rest day
(profile_id, 'rest_day', 80, 100, 100, 130, 35, 50, 30, 1600, 1900)

-- Fasting
(profile_id, 'fasting', 0, 20, 0, 10, 0, 5, 0, 0, 200)
```

---

### 15. juice_plans

**Purpose:** Juice recipes and batch prep scheduling

```sql
CREATE TABLE juice_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  meal_plan_id UUID REFERENCES meal_plans(id) ON DELETE CASCADE,
  recipe_name TEXT NOT NULL,
  ingredients JSONB[] NOT NULL,
  serving_size TEXT, -- '16 oz', '8 oz per person'
  servings INT DEFAULT 4, -- 2 adults + 2 kids
  batch_date DATE NOT NULL, -- When to prep
  good_until DATE, -- Expiration (2-3 days)
  macros JSONB,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_juice_plans_meal_plan ON juice_plans(meal_plan_id);
```

---

### 16. user_preferences

**Purpose:** Individual user app preferences

```sql
CREATE TABLE user_preferences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  notification_settings JSONB DEFAULT '{
    "questionnaire_time": "10:00",
    "daily_checkin_time": "09:00",
    "evening_reminder_time": "21:00",
    "location_reminders": true
  }',
  theme TEXT DEFAULT 'nature' CHECK (theme IN ('nature', 'light', 'dark')),
  language TEXT DEFAULT 'en',
  timezone TEXT DEFAULT 'America/Los_Angeles',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id)
);
```

---

## Indexes

### Performance Indexes

```sql
-- Frequently queried combinations
CREATE INDEX idx_planned_meals_recipe_type ON planned_meals(recipe_id, meal_type);
CREATE INDEX idx_shopping_items_store_purchased ON shopping_items(suggested_store, purchased);
CREATE INDEX idx_inventory_category_expiration ON inventory(category, expiration_date);

-- Full-text search
CREATE INDEX idx_recipes_full_text ON recipes USING GIN(
  to_tsvector('english', name || ' ' || COALESCE(description, ''))
);

-- JSONB indexes for querying within JSON
CREATE INDEX idx_questionnaire_responses_data ON questionnaire_responses USING GIN(responses);
CREATE INDEX idx_planned_meals_macros ON planned_meals USING GIN(macros);
```

---

## Row-Level Security Policies

### Enable RLS on all tables

```sql
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE family_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE family_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE meal_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE planned_meals ENABLE ROW LEVEL SECURITY;
ALTER TABLE recipes ENABLE ROW LEVEL SECURITY;
ALTER TABLE shopping_lists ENABLE ROW LEVEL SECURITY;
ALTER TABLE shopping_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE inventory ENABLE ROW LEVEL SECURITY;
ALTER TABLE questionnaire_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE meal_feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE nutrition_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE food_frequency_rules ENABLE ROW LEVEL SECURITY;
ALTER TABLE macro_targets ENABLE ROW LEVEL SECURITY;
ALTER TABLE juice_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_preferences ENABLE ROW LEVEL SECURITY;
```

### Policy Examples

```sql
-- Users can only view/edit their own data
CREATE POLICY "Users can view own data"
  ON users FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own data"
  ON users FOR UPDATE
  USING (auth.uid() = id);

-- Family members can view all family data
CREATE POLICY "Family members can view meal plans"
  ON meal_plans FOR SELECT
  USING (
    family_id IN (
      SELECT family_id FROM family_members WHERE user_id = auth.uid()
    )
  );

-- Family members can create meal plans for their family
CREATE POLICY "Family members can create meal plans"
  ON meal_plans FOR INSERT
  WITH CHECK (
    family_id IN (
      SELECT family_id FROM family_members WHERE user_id = auth.uid()
    )
  );

-- Anyone can read curated recipes, but only users can create
CREATE POLICY "Anyone can view curated recipes"
  ON recipes FOR SELECT
  USING (source = 'curated' OR created_by = auth.uid());

CREATE POLICY "Users can create recipes"
  ON recipes FOR INSERT
  WITH CHECK (created_by = auth.uid());

-- Inventory is family-specific
CREATE POLICY "Family members can view inventory"
  ON inventory FOR SELECT
  USING (
    family_id IN (
      SELECT family_id FROM family_members WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Family members can manage inventory"
  ON inventory FOR ALL
  USING (
    family_id IN (
      SELECT family_id FROM family_members WHERE user_id = auth.uid()
    )
  );
```

---

## Database Functions

### 1. Update Timestamp Function

```sql
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply to all tables with updated_at
CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- (Repeat for all tables with updated_at)
```

---

### 2. Auto-create Shopping List on Meal Plan Creation

```sql
CREATE OR REPLACE FUNCTION create_shopping_list_for_meal_plan()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO shopping_lists (meal_plan_id, family_id, week_start)
  VALUES (NEW.id, NEW.family_id, NEW.week_start);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_create_shopping_list
  AFTER INSERT ON meal_plans
  FOR EACH ROW
  EXECUTE FUNCTION create_shopping_list_for_meal_plan();
```

---

### 3. Update Shopping List Counters

```sql
CREATE OR REPLACE FUNCTION update_shopping_list_counters()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE shopping_lists
  SET
    total_items = (
      SELECT COUNT(*) FROM shopping_items WHERE shopping_list_id = NEW.shopping_list_id
    ),
    purchased_items = (
      SELECT COUNT(*) FROM shopping_items WHERE shopping_list_id = NEW.shopping_list_id AND purchased = true
    ),
    status = CASE
      WHEN (SELECT COUNT(*) FROM shopping_items WHERE shopping_list_id = NEW.shopping_list_id AND purchased = true) =
           (SELECT COUNT(*) FROM shopping_items WHERE shopping_list_id = NEW.shopping_list_id)
      THEN 'completed'
      WHEN (SELECT COUNT(*) FROM shopping_items WHERE shopping_list_id = NEW.shopping_list_id AND purchased = true) > 0
      THEN 'in_progress'
      ELSE 'pending'
    END
  WHERE id = NEW.shopping_list_id;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_shopping_counters
  AFTER INSERT OR UPDATE ON shopping_items
  FOR EACH ROW
  EXECUTE FUNCTION update_shopping_list_counters();
```

---

### 4. Add Purchased Item to Inventory

```sql
CREATE OR REPLACE FUNCTION add_purchased_item_to_inventory()
RETURNS TRIGGER AS $$
DECLARE
  v_family_id UUID;
BEGIN
  -- Only trigger when item is marked as purchased
  IF NEW.purchased = true AND OLD.purchased = false THEN
    -- Get family_id from shopping_list
    SELECT family_id INTO v_family_id
    FROM shopping_lists
    WHERE id = NEW.shopping_list_id;

    -- Insert into inventory (or update if exists)
    INSERT INTO inventory (family_id, name, quantity, unit, category, purchase_date)
    VALUES (v_family_id, NEW.name, NEW.quantity, NEW.unit, NEW.category, CURRENT_DATE)
    ON CONFLICT (family_id, name) DO UPDATE
    SET
      quantity = inventory.quantity + EXCLUDED.quantity,
      purchase_date = CURRENT_DATE;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_add_to_inventory
  AFTER UPDATE ON shopping_items
  FOR EACH ROW
  EXECUTE FUNCTION add_purchased_item_to_inventory();
```

**Note:** This assumes a unique constraint on `(family_id, name)` for inventory. May need adjustment for multiple entries of same item.

---

### 5. Update Recipe Usage Stats

```sql
CREATE OR REPLACE FUNCTION increment_recipe_usage()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE recipes
  SET times_used = times_used + 1
  WHERE id = NEW.recipe_id;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_increment_recipe_usage
  AFTER INSERT ON planned_meals
  FOR EACH ROW
  WHEN (NEW.recipe_id IS NOT NULL)
  EXECUTE FUNCTION increment_recipe_usage();
```

---

### 6. Update Recipe Average Rating

```sql
CREATE OR REPLACE FUNCTION update_recipe_rating()
RETURNS TRIGGER AS $$
DECLARE
  v_recipe_id UUID;
BEGIN
  -- Get recipe_id from planned_meal
  SELECT recipe_id INTO v_recipe_id
  FROM planned_meals
  WHERE id = NEW.planned_meal_id;

  -- Update average rating
  UPDATE recipes
  SET avg_rating = (
    SELECT AVG(rating)
    FROM meal_feedback mf
    JOIN planned_meals pm ON mf.planned_meal_id = pm.id
    WHERE pm.recipe_id = v_recipe_id
  )
  WHERE id = v_recipe_id;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_recipe_rating
  AFTER INSERT OR UPDATE ON meal_feedback
  FOR EACH ROW
  EXECUTE FUNCTION update_recipe_rating();
```

---

## Triggers

All triggers are defined inline with their respective functions above. Summary:

1. **update_updated_at_column** - Auto-update `updated_at` on all tables
2. **create_shopping_list_for_meal_plan** - Auto-create shopping list when meal plan is created
3. **update_shopping_list_counters** - Update total/purchased item counts
4. **add_purchased_item_to_inventory** - Add purchased items to inventory automatically
5. **increment_recipe_usage** - Track how many times a recipe is used
6. **update_recipe_rating** - Calculate average rating from feedback

---

## Migration Strategy

### Initial Migration (v1)

**File:** `migrations/001_initial_schema.sql`

```sql
-- Create all tables in dependency order
-- 1. users (already exists from Supabase Auth)
-- 2. family_profiles
-- 3. family_members
-- 4. recipes
-- 5. nutrition_profiles
-- 6. food_frequency_rules
-- 7. macro_targets
-- 8. meal_plans
-- 9. planned_meals
-- 10. shopping_lists
-- 11. shopping_items
-- 12. inventory
-- 13. questionnaire_responses
-- 14. meal_feedback
-- 15. juice_plans
-- 16. user_preferences

-- Create indexes
-- Create functions
-- Create triggers
-- Enable RLS
-- Create policies
```

### Seed Data (v1)

**File:** `migrations/002_seed_curated_recipes.sql`

```sql
-- Insert curated recipes aligned with philosophy
INSERT INTO recipes (name, description, meal_type, prep_time, cook_time, servings, macros, ingredients, instructions, tags, top_15_foods, kid_friendly, difficulty, source) VALUES
(
  'Green Power Juice',
  'Cold-pressed juice packed with leafy greens, antioxidants, and anti-inflammatory ingredients',
  ARRAY['juice'],
  10,
  0,
  2,
  '{"protein": 4, "carbs": 28, "fats": 1, "fiber": 6, "calories": 120}',
  ARRAY[
    '{"name": "Spinach", "quantity": 2, "unit": "cups", "category": "produce"}',
    '{"name": "Kale", "quantity": 1, "unit": "cup", "category": "produce"}',
    '{"name": "Cucumber", "quantity": 1, "unit": "whole", "category": "produce"}',
    '{"name": "Lemon", "quantity": 1, "unit": "whole", "category": "produce"}',
    '{"name": "Ginger", "quantity": 1, "unit": "inch", "category": "produce"}',
    '{"name": "Green apple", "quantity": 1, "unit": "whole", "category": "produce"}'
  ],
  ARRAY[
    'Wash all produce thoroughly',
    'Cut cucumber and apple into chunks',
    'Feed all ingredients through cold-press juicer',
    'Stir and serve immediately, or store in airtight container for up to 3 days'
  ],
  ARRAY['vegan', 'gluten-free', 'dairy-free', 'quick', 'juice-cleanse'],
  ARRAY['dark leafy greens', 'lemon', 'ginger root'],
  true,
  'easy',
  'curated'
);

-- (Add 20-30 more curated recipes covering breakfast, lunch, dinner, snacks)
```

### Future Migrations

**Naming convention:** `00X_description.sql`

Examples:
- `003_add_allergy_tracking.sql`
- `004_add_recipe_collections.sql`
- `005_add_workout_integration.sql`

---

## Database Utilities

### Useful Queries

**1. Get current week's meal plan for family:**
```sql
SELECT
  mp.*,
  json_agg(
    json_build_object(
      'day', pm.day_of_week,
      'meal_type', pm.meal_type,
      'meal_name', pm.meal_name,
      'recipe', r.name,
      'macros', pm.macros
    ) ORDER BY
      CASE pm.day_of_week
        WHEN 'Monday' THEN 1
        WHEN 'Tuesday' THEN 2
        WHEN 'Wednesday' THEN 3
        WHEN 'Thursday' THEN 4
        WHEN 'Friday' THEN 5
        WHEN 'Saturday' THEN 6
        WHEN 'Sunday' THEN 7
      END,
      CASE pm.meal_type
        WHEN 'breakfast' THEN 1
        WHEN 'juice' THEN 2
        WHEN 'lunch' THEN 3
        WHEN 'snack' THEN 4
        WHEN 'dinner' THEN 5
        WHEN 'smoothie' THEN 6
      END
  ) as meals
FROM meal_plans mp
LEFT JOIN planned_meals pm ON pm.meal_plan_id = mp.id
LEFT JOIN recipes r ON r.id = pm.recipe_id
WHERE mp.family_id = 'family-uuid'
  AND mp.week_start = '2025-11-17'
GROUP BY mp.id;
```

**2. Find expiring inventory items:**
```sql
SELECT *
FROM inventory
WHERE family_id = 'family-uuid'
  AND expiration_date BETWEEN CURRENT_DATE AND CURRENT_DATE + INTERVAL '3 days'
ORDER BY expiration_date ASC;
```

**3. Get shopping list organized by store:**
```sql
SELECT
  suggested_store,
  json_agg(
    json_build_object(
      'name', name,
      'quantity', quantity,
      'unit', unit,
      'purchased', purchased
    )
  ) as items
FROM shopping_items
WHERE shopping_list_id = 'list-uuid'
GROUP BY suggested_store
ORDER BY suggested_store;
```

**4. Get top-rated recipes:**
```sql
SELECT
  name,
  avg_rating,
  times_used,
  tags,
  top_15_foods
FROM recipes
WHERE deleted_at IS NULL
  AND avg_rating >= 4.0
ORDER BY avg_rating DESC, times_used DESC
LIMIT 20;
```

**5. Track top 15 food coverage for the week:**
```sql
WITH top_15 AS (
  SELECT UNNEST(ARRAY[
    'Broccoli sprouts',
    'Turmeric',
    'Blueberries',
    'Broccoli',
    'Flaxseed',
    'Dark leafy greens',
    'Garlic',
    'Mushrooms',
    'Cacao',
    'Tigernuts',
    'Ginger root',
    'Grapes',
    'Tomatoes',
    'Lemon',
    'Quinoa'
  ]) as food
),
week_foods AS (
  SELECT DISTINCT UNNEST(r.top_15_foods) as food
  FROM planned_meals pm
  JOIN recipes r ON r.id = pm.recipe_id
  JOIN meal_plans mp ON mp.id = pm.meal_plan_id
  WHERE mp.week_start = '2025-11-17'
    AND mp.family_id = 'family-uuid'
)
SELECT
  t.food,
  CASE WHEN w.food IS NOT NULL THEN true ELSE false END as included_this_week
FROM top_15 t
LEFT JOIN week_foods w ON w.food = t.food
ORDER BY included_this_week DESC, t.food;
```

---

## Backup & Maintenance

### Automated Backups

Supabase provides automated backups. For additional safety:

```bash
# Manual backup via Supabase CLI
supabase db dump -f backup_$(date +%Y%m%d).sql

# Restore from backup
supabase db reset --db-url postgresql://... < backup_20251115.sql
```

### Database Maintenance Tasks

**Weekly:**
- Vacuum analyze for query performance
- Review slow query logs

**Monthly:**
- Audit RLS policies
- Check index usage statistics
- Archive old meal plans (>6 months)

```sql
-- Archive old meal plans (soft delete pattern)
UPDATE meal_plans
SET status = 'archived'
WHERE week_end < CURRENT_DATE - INTERVAL '6 months'
  AND status != 'archived';
```

---

**Document Status:** Complete database schema
**Next Steps:**
1. Review development phases (DEVELOPMENT_PHASES.md)
2. Review AI prompts (AI_PROMPT_LIBRARY.md)
3. Set up database locally
4. Run initial migration
5. Seed curated recipes
