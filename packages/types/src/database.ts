/**
 * Database models matching the PostgreSQL schema
 */

import {
  DayOfWeek,
  MealType,
  FamilyRole,
  MealPlanStatus,
  ShoppingListStatus,
  RecipeSource,
  RecipeDifficulty,
  KidAcceptance,
  MacroTargetType,
  FoodFrequencyPriority,
  ShoppingItemPriority,
  InventoryLocation,
  IngredientCategory,
  Theme,
} from './enums';

/**
 * Base timestamps for all database entities
 */
export interface BaseTimestamps {
  created_at: string;
  updated_at: string;
}

/**
 * User entity - Adult family members who use the app
 */
export interface User extends BaseTimestamps {
  id: string;
  email: string;
  name: string;
  avatar_url: string | null;
  push_token: string | null;
}

/**
 * Family profile - Represents a family unit
 */
export interface FamilyProfile extends BaseTimestamps {
  id: string;
  name: string;
  created_by: string;
}

/**
 * Family member - Links users to families
 */
export interface FamilyMember {
  id: string;
  family_id: string;
  user_id: string | null;
  role: FamilyRole;
  name: string | null;
  age: number | null;
  dietary_restrictions: string[] | null;
  created_at: string;
}

/**
 * Nutritional macros breakdown
 */
export interface Macros {
  protein: number;
  carbs: number;
  fats: number;
  fiber: number;
  calories: number;
}

/**
 * Ingredient object used in recipes and planned meals
 */
export interface Ingredient {
  name: string;
  quantity: number;
  unit: string;
  category: IngredientCategory | string;
}

/**
 * Meal plan - Weekly meal plans
 */
export interface MealPlan extends BaseTimestamps {
  id: string;
  family_id: string;
  week_start: string;
  week_end: string;
  status: MealPlanStatus;
  weekly_macros: Macros | null;
  generated_at: string;
}

/**
 * Planned meal - Individual meals within a meal plan
 */
export interface PlannedMeal extends BaseTimestamps {
  id: string;
  meal_plan_id: string;
  recipe_id: string | null;
  day_of_week: DayOfWeek;
  meal_type: MealType;
  meal_name: string;
  serving_size: number;
  macros: Macros | null;
  ingredients: Ingredient[];
  instructions: string[];
  prep_time: number | null;
  cook_time: number | null;
  kid_friendly_notes: string | null;
  age_appropriate_tasks: string[] | null;
  is_fasting: boolean;
  notes: string | null;
}

/**
 * Recipe - Recipe database (curated + AI-generated)
 */
export interface Recipe extends BaseTimestamps {
  id: string;
  name: string;
  description: string | null;
  image_url: string | null;
  source: RecipeSource;
  meal_type: MealType[];
  prep_time: number | null;
  cook_time: number | null;
  servings: number;
  macros: Macros | null;
  ingredients: Ingredient[];
  instructions: string[];
  tags: string[] | null;
  top_15_foods: string[] | null;
  kid_friendly: boolean;
  kid_adaptations: string | null;
  difficulty: RecipeDifficulty | null;
  created_by: string | null;
  is_favorite: boolean;
  times_used: number;
  avg_rating: number | null;
  deleted_at: string | null;
}

/**
 * Shopping list - Shopping lists generated from meal plans
 */
export interface ShoppingList extends BaseTimestamps {
  id: string;
  meal_plan_id: string;
  family_id: string;
  week_start: string;
  status: ShoppingListStatus;
  total_items: number;
  purchased_items: number;
  apple_list_id: string | null;
}

/**
 * Shopping item - Individual items in shopping list
 */
export interface ShoppingItem extends BaseTimestamps {
  id: string;
  shopping_list_id: string;
  name: string;
  quantity: number | null;
  unit: string | null;
  category: string | null;
  suggested_store: string | null;
  priority: ShoppingItemPriority;
  purchased: boolean;
  purchased_at: string | null;
  apple_reminder_id: string | null;
  notes: string | null;
}

/**
 * Inventory - Current ingredient inventory
 */
export interface Inventory extends BaseTimestamps {
  id: string;
  family_id: string;
  name: string;
  quantity: number | null;
  unit: string | null;
  category: string | null;
  purchase_date: string;
  expiration_date: string | null;
  location: InventoryLocation | null;
  is_organic: boolean;
  notes: string | null;
}

/**
 * Workout details in questionnaire response
 */
export interface WorkoutSchedule {
  Monday?: string;
  Tuesday?: string;
  Wednesday?: string;
  Thursday?: string;
  Friday?: string;
  Saturday?: string;
  Sunday?: string;
  intensity?: string;
}

/**
 * Social event details
 */
export interface SocialEvent {
  day: string;
  event: string;
}

/**
 * Work schedule for a day
 */
export interface WorkDay {
  start: string;
  end: string;
  cooking: boolean;
}

/**
 * Work schedule for the week
 */
export interface WorkSchedule {
  Monday?: WorkDay;
  Tuesday?: WorkDay;
  Wednesday?: WorkDay;
  Thursday?: WorkDay;
  Friday?: WorkDay;
  Saturday?: WorkDay;
  Sunday?: WorkDay;
}

/**
 * Previous week feedback
 */
export interface PreviousWeekFeedback {
  kidsLoved?: string[];
  kidsRejected?: string[];
  timeConstraints?: string;
}

/**
 * Questionnaire responses structure
 */
export interface QuestionnaireResponseData {
  cravings?: string[];
  energyLevel?: string;
  workoutSchedule?: WorkoutSchedule;
  socialEvents?: SocialEvent[];
  workSchedule?: WorkSchedule;
  fastingPlans?: string[];
  previousWeekFeedback?: PreviousWeekFeedback;
  openEnded?: string;
}

/**
 * Questionnaire response - Weekly questionnaire responses
 */
export interface QuestionnaireResponse {
  id: string;
  user_id: string;
  family_id: string;
  week_start: string;
  responses: QuestionnaireResponseData;
  completed_at: string;
  created_at: string;
}

/**
 * Meal feedback - Feedback on individual meals
 */
export interface MealFeedback {
  id: string;
  planned_meal_id: string;
  user_id: string;
  rating: number;
  kid_rating: number | null;
  kid_acceptance: KidAcceptance | null;
  actual_prep_time: number | null;
  would_make_again: boolean | null;
  comments: string | null;
  created_at: string;
}

/**
 * Nutrition profile - Family nutrition goals and preferences
 */
export interface NutritionProfile extends BaseTimestamps {
  id: string;
  family_id: string;
  philosophy: string;
  dietary_style: string[] | null;
  daily_juice_required: boolean;
  avoid_foods: string[] | null;
  emphasize_foods: string[] | null;
  allow_fasting: boolean;
  allow_ketosis: boolean;
  active_lifestyle: boolean;
  gut_health_focus: boolean;
}

/**
 * Food frequency rule - Define how often specific foods should appear
 */
export interface FoodFrequencyRule extends BaseTimestamps {
  id: string;
  nutrition_profile_id: string;
  food_name: string;
  frequency_days: number;
  is_top_15: boolean;
  priority: FoodFrequencyPriority;
}

/**
 * Macro targets - Daily macro targets
 */
export interface MacroTarget extends BaseTimestamps {
  id: string;
  nutrition_profile_id: string;
  target_type: MacroTargetType;
  protein_min: number | null;
  protein_max: number | null;
  carbs_min: number | null;
  carbs_max: number | null;
  fats_min: number | null;
  fats_max: number | null;
  fiber_min: number | null;
  calories_min: number | null;
  calories_max: number | null;
}

/**
 * Juice plan - Juice recipes and batch prep scheduling
 */
export interface JuicePlan {
  id: string;
  meal_plan_id: string;
  recipe_name: string;
  ingredients: Ingredient[];
  serving_size: string | null;
  servings: number;
  batch_date: string;
  good_until: string | null;
  macros: Macros | null;
  notes: string | null;
  created_at: string;
}

/**
 * Notification settings
 */
export interface NotificationSettings {
  questionnaire_time: string;
  daily_checkin_time: string;
  evening_reminder_time: string;
  location_reminders: boolean;
}

/**
 * User preferences - Individual user app preferences
 */
export interface UserPreferences extends BaseTimestamps {
  id: string;
  user_id: string;
  notification_settings: NotificationSettings;
  theme: Theme;
  language: string;
  timezone: string;
}
