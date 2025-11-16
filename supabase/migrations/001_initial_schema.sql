-- =====================================================
-- GoodLifeNels - Initial Database Schema
-- Version: 1.0
-- Created: 2025-11-15
-- Description: Complete database schema for GoodLifeNels
--              Meal planning app with "Go Back to Nature" philosophy
-- =====================================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm"; -- For fuzzy text search

-- =====================================================
-- PART 1: DATABASE FUNCTIONS
-- =====================================================

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Function to auto-create shopping list when meal plan is created
CREATE OR REPLACE FUNCTION create_shopping_list_for_meal_plan()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO shopping_lists (meal_plan_id, family_id, week_start)
  VALUES (NEW.id, NEW.family_id, NEW.week_start);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Function to update shopping list counters
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

-- Function to add purchased items to inventory (optional, can be disabled)
CREATE OR REPLACE FUNCTION add_purchased_item_to_inventory()
RETURNS TRIGGER AS $$
DECLARE
  v_family_id UUID;
BEGIN
  -- Only trigger when item is marked as purchased
  IF NEW.purchased = true AND (OLD IS NULL OR OLD.purchased = false) THEN
    -- Get family_id from shopping_list
    SELECT family_id INTO v_family_id
    FROM shopping_lists
    WHERE id = NEW.shopping_list_id;

    -- Insert into inventory
    INSERT INTO inventory (family_id, name, quantity, unit, category, purchase_date)
    VALUES (v_family_id, NEW.name, NEW.quantity, NEW.unit, NEW.category, CURRENT_DATE);
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Function to increment recipe usage count
CREATE OR REPLACE FUNCTION increment_recipe_usage()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE recipes
  SET times_used = times_used + 1
  WHERE id = NEW.recipe_id;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Function to update recipe average rating
CREATE OR REPLACE FUNCTION update_recipe_rating()
RETURNS TRIGGER AS $$
DECLARE
  v_recipe_id UUID;
BEGIN
  -- Get recipe_id from planned_meal
  SELECT recipe_id INTO v_recipe_id
  FROM planned_meals
  WHERE id = NEW.planned_meal_id;

  IF v_recipe_id IS NOT NULL THEN
    -- Update average rating
    UPDATE recipes
    SET avg_rating = (
      SELECT AVG(rating)
      FROM meal_feedback mf
      JOIN planned_meals pm ON mf.planned_meal_id = pm.id
      WHERE pm.recipe_id = v_recipe_id
    )
    WHERE id = v_recipe_id;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- PART 2: TABLE DEFINITIONS
-- =====================================================

-- -----------------------------------------------------
-- Table: users
-- Purpose: Adult family members who use the app
-- Note: Syncs with Supabase auth.users
-- -----------------------------------------------------
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  avatar_url TEXT,
  push_token TEXT, -- For Expo push notifications
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

COMMENT ON TABLE users IS 'Adult family members with app accounts';
COMMENT ON COLUMN users.push_token IS 'Expo push notification token for mobile notifications';

-- -----------------------------------------------------
-- Table: family_profiles
-- Purpose: Represents a family unit
-- -----------------------------------------------------
CREATE TABLE family_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL, -- e.g., "The Nels Family"
  created_by UUID REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

COMMENT ON TABLE family_profiles IS 'Family units - the core organizational structure';

-- -----------------------------------------------------
-- Table: family_members
-- Purpose: Links users to families (supports multi-family)
-- Note: Adults have user_id, children have name/age
-- -----------------------------------------------------
CREATE TABLE family_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  family_id UUID REFERENCES family_profiles(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('adult', 'child')),
  name TEXT, -- For children (who don't have user accounts)
  age INT, -- For children
  dietary_restrictions TEXT[], -- Array of restrictions e.g., ['dairy', 'nuts']
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(family_id, user_id)
);

COMMENT ON TABLE family_members IS 'Links users to families - adults via user_id, children via name/age';
COMMENT ON COLUMN family_members.dietary_restrictions IS 'Array of dietary restrictions: dairy, nuts, gluten, etc.';

-- -----------------------------------------------------
-- Table: recipes
-- Purpose: Recipe database (curated + AI-generated + user-created)
-- -----------------------------------------------------
CREATE TABLE recipes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  source TEXT CHECK (source IN ('curated', 'ai-generated', 'user-created')), -- Recipe origin
  meal_type TEXT[] NOT NULL, -- ['breakfast', 'lunch', 'dinner', 'snack', 'juice', 'smoothie']
  prep_time INT, -- minutes
  cook_time INT, -- minutes
  servings INT DEFAULT 2,
  macros JSONB, -- {protein, carbs, fats, fiber, calories}
  ingredients JSONB[] NOT NULL, -- Array of {name, quantity, unit, category}
  instructions TEXT[] NOT NULL,
  tags TEXT[], -- ['vegan', 'gluten-free', 'quick', 'kid-friendly', etc.]
  top_15_foods TEXT[], -- Which top 15 superfoods this includes
  kid_friendly BOOLEAN DEFAULT FALSE,
  kid_adaptations TEXT, -- How to modify for kids
  difficulty TEXT CHECK (difficulty IN ('easy', 'medium', 'hard')),
  created_by UUID REFERENCES users(id) ON DELETE SET NULL,
  is_favorite BOOLEAN DEFAULT FALSE,
  times_used INT DEFAULT 0,
  avg_rating DECIMAL(3,2),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  deleted_at TIMESTAMPTZ -- Soft delete
);

COMMENT ON TABLE recipes IS 'Recipe database with curated and AI-generated recipes';
COMMENT ON COLUMN recipes.top_15_foods IS 'References to top 15 superfoods included in this recipe';
COMMENT ON COLUMN recipes.macros IS 'JSON: {protein, carbs, fats, fiber, calories} per serving';
COMMENT ON COLUMN recipes.ingredients IS 'JSON array: [{name, quantity, unit, category}]';

-- -----------------------------------------------------
-- Table: nutrition_profiles
-- Purpose: Family nutrition goals and preferences
-- -----------------------------------------------------
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

COMMENT ON TABLE nutrition_profiles IS 'Defines family nutrition philosophy and preferences';

-- -----------------------------------------------------
-- Table: food_frequency_rules
-- Purpose: Define how often specific foods should appear
-- -----------------------------------------------------
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

COMMENT ON TABLE food_frequency_rules IS 'Defines frequency requirements for specific foods (especially top 15)';
COMMENT ON COLUMN food_frequency_rules.frequency_days IS '1=daily, 2=every 2 days, 7=weekly, etc.';

-- -----------------------------------------------------
-- Table: macro_targets
-- Purpose: Daily macro targets (varies by activity level)
-- -----------------------------------------------------
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

COMMENT ON TABLE macro_targets IS 'Daily macro targets that vary by activity level';

-- -----------------------------------------------------
-- Table: meal_plans
-- Purpose: Weekly meal plans
-- -----------------------------------------------------
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

COMMENT ON TABLE meal_plans IS 'Weekly meal plans for families';
COMMENT ON COLUMN meal_plans.weekly_macros IS 'JSON: Aggregated macros for entire week';

-- -----------------------------------------------------
-- Table: planned_meals
-- Purpose: Individual meals within a meal plan
-- -----------------------------------------------------
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
  age_appropriate_tasks TEXT[], -- Tasks kids can help with
  is_fasting BOOLEAN DEFAULT FALSE, -- If this is a fasting meal (skipped)
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

COMMENT ON TABLE planned_meals IS 'Individual meals scheduled in meal plans';
COMMENT ON COLUMN planned_meals.is_fasting IS 'True if this meal is skipped for intermittent fasting';
COMMENT ON COLUMN planned_meals.age_appropriate_tasks IS 'Tasks children can help with for this meal';

-- -----------------------------------------------------
-- Table: shopping_lists
-- Purpose: Shopping lists generated from meal plans
-- -----------------------------------------------------
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

COMMENT ON TABLE shopping_lists IS 'Shopping lists auto-generated from meal plans';
COMMENT ON COLUMN shopping_lists.apple_list_id IS 'Reference to synced Apple Reminders list';

-- -----------------------------------------------------
-- Table: shopping_items
-- Purpose: Individual items in shopping list
-- -----------------------------------------------------
CREATE TABLE shopping_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  shopping_list_id UUID REFERENCES shopping_lists(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  quantity DECIMAL(10,2),
  unit TEXT,
  category TEXT, -- 'produce', 'dairy', 'meat', 'grains', etc.
  suggested_store TEXT, -- 'Costco', 'Sprouts', 'Trader Joes', etc.
  priority TEXT DEFAULT 'normal' CHECK (priority IN ('high', 'normal', 'low')),
  purchased BOOLEAN DEFAULT FALSE,
  purchased_at TIMESTAMPTZ,
  apple_reminder_id TEXT, -- Reference to Apple Reminder
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

COMMENT ON TABLE shopping_items IS 'Individual items in shopping lists';
COMMENT ON COLUMN shopping_items.suggested_store IS 'Suggested store based on item category and cost';

-- -----------------------------------------------------
-- Table: inventory
-- Purpose: Current ingredient inventory
-- -----------------------------------------------------
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

COMMENT ON TABLE inventory IS 'Current ingredient inventory for each family';
COMMENT ON COLUMN inventory.location IS 'Storage location: fridge, freezer, pantry';

-- -----------------------------------------------------
-- Table: questionnaire_responses
-- Purpose: Weekly questionnaire responses
-- -----------------------------------------------------
CREATE TABLE questionnaire_responses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  family_id UUID REFERENCES family_profiles(id) ON DELETE CASCADE,
  week_start DATE NOT NULL,
  responses JSONB NOT NULL, -- Flexible question/answer storage
  completed_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

COMMENT ON TABLE questionnaire_responses IS 'Weekly questionnaire responses for meal plan generation';
COMMENT ON COLUMN questionnaire_responses.responses IS 'JSON: Flexible storage for all questionnaire answers';

-- -----------------------------------------------------
-- Table: meal_feedback
-- Purpose: Feedback on individual meals
-- -----------------------------------------------------
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

COMMENT ON TABLE meal_feedback IS 'User feedback on prepared meals';
COMMENT ON COLUMN meal_feedback.kid_acceptance IS 'How well kids accepted the meal';

-- -----------------------------------------------------
-- Table: juice_plans
-- Purpose: Juice recipes and batch prep scheduling
-- -----------------------------------------------------
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

COMMENT ON TABLE juice_plans IS 'Juice batch prep plans for daily fresh juice';

-- -----------------------------------------------------
-- Table: user_preferences
-- Purpose: Individual user app preferences
-- -----------------------------------------------------
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

COMMENT ON TABLE user_preferences IS 'User-specific app preferences and notification settings';

-- =====================================================
-- PART 3: INDEXES
-- =====================================================

-- Family Members
CREATE INDEX idx_family_members_family ON family_members(family_id);
CREATE INDEX idx_family_members_user ON family_members(user_id);

-- Meal Plans
CREATE INDEX idx_meal_plans_family_week ON meal_plans(family_id, week_start);

-- Planned Meals
CREATE INDEX idx_planned_meals_plan ON planned_meals(meal_plan_id);
CREATE INDEX idx_planned_meals_day ON planned_meals(meal_plan_id, day_of_week);
CREATE INDEX idx_planned_meals_recipe_type ON planned_meals(recipe_id, meal_type);

-- Recipes (GIN indexes for array/text search)
CREATE INDEX idx_recipes_meal_type ON recipes USING GIN(meal_type);
CREATE INDEX idx_recipes_tags ON recipes USING GIN(tags);
CREATE INDEX idx_recipes_top_15 ON recipes USING GIN(top_15_foods);
CREATE INDEX idx_recipes_name_search ON recipes USING GIN(to_tsvector('english', name));
CREATE INDEX idx_recipes_active ON recipes(id) WHERE deleted_at IS NULL;
CREATE INDEX idx_recipes_full_text ON recipes USING GIN(
  to_tsvector('english', name || ' ' || COALESCE(description, ''))
);

-- Shopping Lists
CREATE INDEX idx_shopping_lists_family_week ON shopping_lists(family_id, week_start);

-- Shopping Items
CREATE INDEX idx_shopping_items_list ON shopping_items(shopping_list_id);
CREATE INDEX idx_shopping_items_purchased ON shopping_items(shopping_list_id, purchased);
CREATE INDEX idx_shopping_items_store ON shopping_items(suggested_store);
CREATE INDEX idx_shopping_items_store_purchased ON shopping_items(suggested_store, purchased);

-- Inventory
CREATE INDEX idx_inventory_family ON inventory(family_id);
CREATE INDEX idx_inventory_expiration ON inventory(family_id, expiration_date);
CREATE INDEX idx_inventory_name ON inventory(family_id, name);
CREATE INDEX idx_inventory_category_expiration ON inventory(category, expiration_date);

-- Questionnaire Responses
CREATE INDEX idx_questionnaire_user_week ON questionnaire_responses(user_id, week_start);
CREATE INDEX idx_questionnaire_family_week ON questionnaire_responses(family_id, week_start);
CREATE INDEX idx_questionnaire_responses_data ON questionnaire_responses USING GIN(responses);

-- Meal Feedback
CREATE INDEX idx_meal_feedback_meal ON meal_feedback(planned_meal_id);
CREATE INDEX idx_meal_feedback_user ON meal_feedback(user_id);

-- Food Frequency Rules
CREATE INDEX idx_food_frequency_profile ON food_frequency_rules(nutrition_profile_id);
CREATE INDEX idx_food_frequency_top15 ON food_frequency_rules(nutrition_profile_id, is_top_15);

-- Macro Targets
CREATE INDEX idx_macro_targets_profile ON macro_targets(nutrition_profile_id);

-- Juice Plans
CREATE INDEX idx_juice_plans_meal_plan ON juice_plans(meal_plan_id);

-- JSONB performance indexes
CREATE INDEX idx_planned_meals_macros ON planned_meals USING GIN(macros);

-- =====================================================
-- PART 4: TRIGGERS
-- =====================================================

-- Update updated_at timestamp triggers
CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_family_profiles_updated_at
  BEFORE UPDATE ON family_profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_recipes_updated_at
  BEFORE UPDATE ON recipes
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_nutrition_profiles_updated_at
  BEFORE UPDATE ON nutrition_profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_food_frequency_rules_updated_at
  BEFORE UPDATE ON food_frequency_rules
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_macro_targets_updated_at
  BEFORE UPDATE ON macro_targets
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_meal_plans_updated_at
  BEFORE UPDATE ON meal_plans
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_planned_meals_updated_at
  BEFORE UPDATE ON planned_meals
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_shopping_lists_updated_at
  BEFORE UPDATE ON shopping_lists
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_shopping_items_updated_at
  BEFORE UPDATE ON shopping_items
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_inventory_updated_at
  BEFORE UPDATE ON inventory
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_preferences_updated_at
  BEFORE UPDATE ON user_preferences
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Auto-create shopping list when meal plan is created
CREATE TRIGGER trigger_create_shopping_list
  AFTER INSERT ON meal_plans
  FOR EACH ROW
  EXECUTE FUNCTION create_shopping_list_for_meal_plan();

-- Update shopping list counters
CREATE TRIGGER trigger_update_shopping_counters
  AFTER INSERT OR UPDATE ON shopping_items
  FOR EACH ROW
  EXECUTE FUNCTION update_shopping_list_counters();

-- Add purchased items to inventory (optional - comment out if not desired)
CREATE TRIGGER trigger_add_to_inventory
  AFTER UPDATE ON shopping_items
  FOR EACH ROW
  EXECUTE FUNCTION add_purchased_item_to_inventory();

-- Increment recipe usage count
CREATE TRIGGER trigger_increment_recipe_usage
  AFTER INSERT ON planned_meals
  FOR EACH ROW
  WHEN (NEW.recipe_id IS NOT NULL)
  EXECUTE FUNCTION increment_recipe_usage();

-- Update recipe rating
CREATE TRIGGER trigger_update_recipe_rating
  AFTER INSERT OR UPDATE ON meal_feedback
  FOR EACH ROW
  EXECUTE FUNCTION update_recipe_rating();

-- =====================================================
-- PART 5: ROW LEVEL SECURITY (RLS)
-- =====================================================

-- Enable RLS on all tables
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

-- =====================================================
-- USERS Policies
-- =====================================================

CREATE POLICY "Users can view own data"
  ON users FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own data"
  ON users FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own data"
  ON users FOR INSERT
  WITH CHECK (auth.uid() = id);

-- =====================================================
-- FAMILY PROFILES Policies
-- =====================================================

CREATE POLICY "Family members can view their families"
  ON family_profiles FOR SELECT
  USING (
    id IN (
      SELECT family_id FROM family_members WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create family profiles"
  ON family_profiles FOR INSERT
  WITH CHECK (created_by = auth.uid());

CREATE POLICY "Family creators can update profiles"
  ON family_profiles FOR UPDATE
  USING (created_by = auth.uid());

CREATE POLICY "Family creators can delete profiles"
  ON family_profiles FOR DELETE
  USING (created_by = auth.uid());

-- =====================================================
-- FAMILY MEMBERS Policies
-- =====================================================

CREATE POLICY "Family members can view family roster"
  ON family_members FOR SELECT
  USING (
    family_id IN (
      SELECT family_id FROM family_members WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Family members can add members"
  ON family_members FOR INSERT
  WITH CHECK (
    family_id IN (
      SELECT family_id FROM family_members WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Family members can update roster"
  ON family_members FOR UPDATE
  USING (
    family_id IN (
      SELECT family_id FROM family_members WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Family members can remove members"
  ON family_members FOR DELETE
  USING (
    family_id IN (
      SELECT family_id FROM family_members WHERE user_id = auth.uid()
    )
  );

-- =====================================================
-- MEAL PLANS Policies
-- =====================================================

CREATE POLICY "Family members can view meal plans"
  ON meal_plans FOR SELECT
  USING (
    family_id IN (
      SELECT family_id FROM family_members WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Family members can create meal plans"
  ON meal_plans FOR INSERT
  WITH CHECK (
    family_id IN (
      SELECT family_id FROM family_members WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Family members can update meal plans"
  ON meal_plans FOR UPDATE
  USING (
    family_id IN (
      SELECT family_id FROM family_members WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Family members can delete meal plans"
  ON meal_plans FOR DELETE
  USING (
    family_id IN (
      SELECT family_id FROM family_members WHERE user_id = auth.uid()
    )
  );

-- =====================================================
-- PLANNED MEALS Policies
-- =====================================================

CREATE POLICY "Family members can view planned meals"
  ON planned_meals FOR SELECT
  USING (
    meal_plan_id IN (
      SELECT id FROM meal_plans WHERE family_id IN (
        SELECT family_id FROM family_members WHERE user_id = auth.uid()
      )
    )
  );

CREATE POLICY "Family members can create planned meals"
  ON planned_meals FOR INSERT
  WITH CHECK (
    meal_plan_id IN (
      SELECT id FROM meal_plans WHERE family_id IN (
        SELECT family_id FROM family_members WHERE user_id = auth.uid()
      )
    )
  );

CREATE POLICY "Family members can update planned meals"
  ON planned_meals FOR UPDATE
  USING (
    meal_plan_id IN (
      SELECT id FROM meal_plans WHERE family_id IN (
        SELECT family_id FROM family_members WHERE user_id = auth.uid()
      )
    )
  );

CREATE POLICY "Family members can delete planned meals"
  ON planned_meals FOR DELETE
  USING (
    meal_plan_id IN (
      SELECT id FROM meal_plans WHERE family_id IN (
        SELECT family_id FROM family_members WHERE user_id = auth.uid()
      )
    )
  );

-- =====================================================
-- RECIPES Policies
-- =====================================================

CREATE POLICY "Anyone can view curated recipes"
  ON recipes FOR SELECT
  USING (source = 'curated' OR created_by = auth.uid() OR deleted_at IS NULL);

CREATE POLICY "Users can create recipes"
  ON recipes FOR INSERT
  WITH CHECK (created_by = auth.uid());

CREATE POLICY "Users can update own recipes"
  ON recipes FOR UPDATE
  USING (created_by = auth.uid());

CREATE POLICY "Users can delete own recipes"
  ON recipes FOR DELETE
  USING (created_by = auth.uid());

-- =====================================================
-- SHOPPING LISTS Policies
-- =====================================================

CREATE POLICY "Family members can view shopping lists"
  ON shopping_lists FOR SELECT
  USING (
    family_id IN (
      SELECT family_id FROM family_members WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Family members can create shopping lists"
  ON shopping_lists FOR INSERT
  WITH CHECK (
    family_id IN (
      SELECT family_id FROM family_members WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Family members can update shopping lists"
  ON shopping_lists FOR UPDATE
  USING (
    family_id IN (
      SELECT family_id FROM family_members WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Family members can delete shopping lists"
  ON shopping_lists FOR DELETE
  USING (
    family_id IN (
      SELECT family_id FROM family_members WHERE user_id = auth.uid()
    )
  );

-- =====================================================
-- SHOPPING ITEMS Policies
-- =====================================================

CREATE POLICY "Family members can view shopping items"
  ON shopping_items FOR SELECT
  USING (
    shopping_list_id IN (
      SELECT id FROM shopping_lists WHERE family_id IN (
        SELECT family_id FROM family_members WHERE user_id = auth.uid()
      )
    )
  );

CREATE POLICY "Family members can create shopping items"
  ON shopping_items FOR INSERT
  WITH CHECK (
    shopping_list_id IN (
      SELECT id FROM shopping_lists WHERE family_id IN (
        SELECT family_id FROM family_members WHERE user_id = auth.uid()
      )
    )
  );

CREATE POLICY "Family members can update shopping items"
  ON shopping_items FOR UPDATE
  USING (
    shopping_list_id IN (
      SELECT id FROM shopping_lists WHERE family_id IN (
        SELECT family_id FROM family_members WHERE user_id = auth.uid()
      )
    )
  );

CREATE POLICY "Family members can delete shopping items"
  ON shopping_items FOR DELETE
  USING (
    shopping_list_id IN (
      SELECT id FROM shopping_lists WHERE family_id IN (
        SELECT family_id FROM family_members WHERE user_id = auth.uid()
      )
    )
  );

-- =====================================================
-- INVENTORY Policies
-- =====================================================

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

-- =====================================================
-- QUESTIONNAIRE RESPONSES Policies
-- =====================================================

CREATE POLICY "Users can view own questionnaire responses"
  ON questionnaire_responses FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "Users can create questionnaire responses"
  ON questionnaire_responses FOR INSERT
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Family members can view family questionnaires"
  ON questionnaire_responses FOR SELECT
  USING (
    family_id IN (
      SELECT family_id FROM family_members WHERE user_id = auth.uid()
    )
  );

-- =====================================================
-- MEAL FEEDBACK Policies
-- =====================================================

CREATE POLICY "Users can view own feedback"
  ON meal_feedback FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "Users can create feedback"
  ON meal_feedback FOR INSERT
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own feedback"
  ON meal_feedback FOR UPDATE
  USING (user_id = auth.uid());

-- =====================================================
-- NUTRITION PROFILES Policies
-- =====================================================

CREATE POLICY "Family members can view nutrition profiles"
  ON nutrition_profiles FOR SELECT
  USING (
    family_id IN (
      SELECT family_id FROM family_members WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Family members can manage nutrition profiles"
  ON nutrition_profiles FOR ALL
  USING (
    family_id IN (
      SELECT family_id FROM family_members WHERE user_id = auth.uid()
    )
  );

-- =====================================================
-- FOOD FREQUENCY RULES Policies
-- =====================================================

CREATE POLICY "Family members can view food frequency rules"
  ON food_frequency_rules FOR SELECT
  USING (
    nutrition_profile_id IN (
      SELECT id FROM nutrition_profiles WHERE family_id IN (
        SELECT family_id FROM family_members WHERE user_id = auth.uid()
      )
    )
  );

CREATE POLICY "Family members can manage food frequency rules"
  ON food_frequency_rules FOR ALL
  USING (
    nutrition_profile_id IN (
      SELECT id FROM nutrition_profiles WHERE family_id IN (
        SELECT family_id FROM family_members WHERE user_id = auth.uid()
      )
    )
  );

-- =====================================================
-- MACRO TARGETS Policies
-- =====================================================

CREATE POLICY "Family members can view macro targets"
  ON macro_targets FOR SELECT
  USING (
    nutrition_profile_id IN (
      SELECT id FROM nutrition_profiles WHERE family_id IN (
        SELECT family_id FROM family_members WHERE user_id = auth.uid()
      )
    )
  );

CREATE POLICY "Family members can manage macro targets"
  ON macro_targets FOR ALL
  USING (
    nutrition_profile_id IN (
      SELECT id FROM nutrition_profiles WHERE family_id IN (
        SELECT family_id FROM family_members WHERE user_id = auth.uid()
      )
    )
  );

-- =====================================================
-- JUICE PLANS Policies
-- =====================================================

CREATE POLICY "Family members can view juice plans"
  ON juice_plans FOR SELECT
  USING (
    meal_plan_id IN (
      SELECT id FROM meal_plans WHERE family_id IN (
        SELECT family_id FROM family_members WHERE user_id = auth.uid()
      )
    )
  );

CREATE POLICY "Family members can manage juice plans"
  ON juice_plans FOR ALL
  USING (
    meal_plan_id IN (
      SELECT id FROM meal_plans WHERE family_id IN (
        SELECT family_id FROM family_members WHERE user_id = auth.uid()
      )
    )
  );

-- =====================================================
-- USER PREFERENCES Policies
-- =====================================================

CREATE POLICY "Users can view own preferences"
  ON user_preferences FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "Users can manage own preferences"
  ON user_preferences FOR ALL
  USING (user_id = auth.uid());

-- =====================================================
-- MIGRATION COMPLETE
-- =====================================================

COMMENT ON SCHEMA public IS 'GoodLifeNels Database Schema v1.0 - Initial migration completed';
