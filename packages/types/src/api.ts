/**
 * API request and response types for GoodLifeNels
 */

import {
  User,
  FamilyProfile,
  FamilyMember,
  MealPlan,
  PlannedMeal,
  Recipe,
  ShoppingList,
  ShoppingItem,
  Inventory,
  QuestionnaireResponse,
  MealFeedback,
  NutritionProfile,
  FoodFrequencyRule,
  MacroTarget,
  JuicePlan,
  UserPreferences,
  Macros,
  Ingredient,
  QuestionnaireResponseData,
} from './database';
import {
  MealType,
  DayOfWeek,
  FamilyRole,
  RecipeSource,
  RecipeDifficulty,
  ShoppingItemPriority,
  InventoryLocation,
  MacroTargetType,
  FoodFrequencyPriority,
} from './enums';

/**
 * Generic API response wrapper
 */
export interface ApiResponse<T> {
  data: T;
  error: null;
}

/**
 * Generic API error response
 */
export interface ApiError {
  data: null;
  error: {
    message: string;
    code?: string;
    details?: unknown;
  };
}

/**
 * Paginated response
 */
export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    pageSize: number;
    totalCount: number;
    totalPages: number;
  };
  error: null;
}

/**
 * Generic API result type
 */
export type ApiResult<T> = ApiResponse<T> | ApiError;

// ============================================================================
// User API Types
// ============================================================================

/**
 * Create user request
 */
export interface CreateUserRequest {
  email: string;
  name: string;
  avatar_url?: string;
}

/**
 * Update user request
 */
export interface UpdateUserRequest {
  name?: string;
  avatar_url?: string;
  push_token?: string;
}

/**
 * User response
 */
export type UserResponse = ApiResponse<User>;

// ============================================================================
// Family API Types
// ============================================================================

/**
 * Create family profile request
 */
export interface CreateFamilyProfileRequest {
  name: string;
}

/**
 * Add family member request
 */
export interface AddFamilyMemberRequest {
  family_id: string;
  user_id?: string;
  role: FamilyRole;
  name?: string;
  age?: number;
  dietary_restrictions?: string[];
}

/**
 * Family profile with members
 */
export interface FamilyProfileWithMembers extends FamilyProfile {
  members: FamilyMember[];
}

/**
 * Family profile response
 */
export type FamilyProfileResponse = ApiResponse<FamilyProfileWithMembers>;

// ============================================================================
// Meal Plan API Types
// ============================================================================

/**
 * Generate meal plan request
 */
export interface GenerateMealPlanRequest {
  family_id: string;
  week_start: string;
  questionnaire_response?: QuestionnaireResponseData;
}

/**
 * Meal plan with meals
 */
export interface MealPlanWithMeals extends MealPlan {
  meals: PlannedMeal[];
}

/**
 * Meal plan response
 */
export type MealPlanResponse = ApiResponse<MealPlanWithMeals>;

/**
 * Update planned meal request
 */
export interface UpdatePlannedMealRequest {
  meal_name?: string;
  recipe_id?: string;
  serving_size?: number;
  macros?: Macros;
  ingredients?: Ingredient[];
  instructions?: string[];
  prep_time?: number;
  cook_time?: number;
  kid_friendly_notes?: string;
  age_appropriate_tasks?: string[];
  is_fasting?: boolean;
  notes?: string;
}

/**
 * Replace planned meal request
 */
export interface ReplacePlannedMealRequest {
  planned_meal_id: string;
  new_recipe_id?: string;
  meal_type?: MealType;
  preferences?: {
    quick?: boolean;
    kid_friendly?: boolean;
    dietary_restrictions?: string[];
  };
}

// ============================================================================
// Recipe API Types
// ============================================================================

/**
 * Recipe search filters
 */
export interface RecipeSearchFilters {
  meal_type?: MealType | MealType[];
  tags?: string[];
  top_15_foods?: string[];
  kid_friendly?: boolean;
  difficulty?: RecipeDifficulty;
  max_prep_time?: number;
  max_cook_time?: number;
  source?: RecipeSource;
  search_query?: string;
}

/**
 * Recipe search request
 */
export interface RecipeSearchRequest extends RecipeSearchFilters {
  page?: number;
  page_size?: number;
}

/**
 * Create recipe request
 */
export interface CreateRecipeRequest {
  name: string;
  description?: string;
  image_url?: string;
  meal_type: MealType[];
  prep_time?: number;
  cook_time?: number;
  servings: number;
  macros?: Macros;
  ingredients: Ingredient[];
  instructions: string[];
  tags?: string[];
  top_15_foods?: string[];
  kid_friendly?: boolean;
  kid_adaptations?: string;
  difficulty?: RecipeDifficulty;
}

/**
 * Recipe response
 */
export type RecipeResponse = ApiResponse<Recipe>;

/**
 * Recipe list response
 */
export type RecipeListResponse = PaginatedResponse<Recipe>;

// ============================================================================
// Shopping List API Types
// ============================================================================

/**
 * Shopping list with items
 */
export interface ShoppingListWithItems extends ShoppingList {
  items: ShoppingItem[];
}

/**
 * Shopping list response
 */
export type ShoppingListResponse = ApiResponse<ShoppingListWithItems>;

/**
 * Add shopping item request
 */
export interface AddShoppingItemRequest {
  shopping_list_id: string;
  name: string;
  quantity?: number;
  unit?: string;
  category?: string;
  suggested_store?: string;
  priority?: ShoppingItemPriority;
  notes?: string;
}

/**
 * Update shopping item request
 */
export interface UpdateShoppingItemRequest {
  name?: string;
  quantity?: number;
  unit?: string;
  category?: string;
  suggested_store?: string;
  priority?: ShoppingItemPriority;
  purchased?: boolean;
  notes?: string;
}

/**
 * Shopping items grouped by store
 */
export interface ShoppingItemsByStore {
  store: string;
  items: ShoppingItem[];
}

/**
 * Shopping list by store response
 */
export type ShoppingListByStoreResponse = ApiResponse<ShoppingItemsByStore[]>;

// ============================================================================
// Inventory API Types
// ============================================================================

/**
 * Add inventory item request
 */
export interface AddInventoryItemRequest {
  family_id: string;
  name: string;
  quantity?: number;
  unit?: string;
  category?: string;
  purchase_date?: string;
  expiration_date?: string;
  location?: InventoryLocation;
  is_organic?: boolean;
  notes?: string;
}

/**
 * Update inventory item request
 */
export interface UpdateInventoryItemRequest {
  name?: string;
  quantity?: number;
  unit?: string;
  category?: string;
  purchase_date?: string;
  expiration_date?: string;
  location?: InventoryLocation;
  is_organic?: boolean;
  notes?: string;
}

/**
 * Inventory list response
 */
export type InventoryListResponse = ApiResponse<Inventory[]>;

/**
 * Expiring inventory items
 */
export interface ExpiringInventory {
  expiring_soon: Inventory[];
  expired: Inventory[];
}

/**
 * Expiring inventory response
 */
export type ExpiringInventoryResponse = ApiResponse<ExpiringInventory>;

// ============================================================================
// Questionnaire API Types
// ============================================================================

/**
 * Submit questionnaire request
 */
export interface SubmitQuestionnaireRequest {
  family_id: string;
  week_start: string;
  responses: QuestionnaireResponseData;
}

/**
 * Questionnaire response
 */
export type QuestionnaireApiResponse = ApiResponse<QuestionnaireResponse>;

// ============================================================================
// Meal Feedback API Types
// ============================================================================

/**
 * Submit meal feedback request
 */
export interface SubmitMealFeedbackRequest {
  planned_meal_id: string;
  rating: number;
  kid_rating?: number;
  kid_acceptance?: string;
  actual_prep_time?: number;
  would_make_again?: boolean;
  comments?: string;
}

/**
 * Meal feedback response
 */
export type MealFeedbackResponse = ApiResponse<MealFeedback>;

// ============================================================================
// Nutrition Profile API Types
// ============================================================================

/**
 * Create/update nutrition profile request
 */
export interface UpsertNutritionProfileRequest {
  family_id: string;
  philosophy?: string;
  dietary_style?: string[];
  daily_juice_required?: boolean;
  avoid_foods?: string[];
  emphasize_foods?: string[];
  allow_fasting?: boolean;
  allow_ketosis?: boolean;
  active_lifestyle?: boolean;
  gut_health_focus?: boolean;
}

/**
 * Nutrition profile with rules and targets
 */
export interface NutritionProfileComplete extends NutritionProfile {
  food_frequency_rules: FoodFrequencyRule[];
  macro_targets: MacroTarget[];
}

/**
 * Nutrition profile response
 */
export type NutritionProfileResponse = ApiResponse<NutritionProfileComplete>;

/**
 * Add food frequency rule request
 */
export interface AddFoodFrequencyRuleRequest {
  nutrition_profile_id: string;
  food_name: string;
  frequency_days: number;
  is_top_15?: boolean;
  priority?: FoodFrequencyPriority;
}

/**
 * Add macro target request
 */
export interface AddMacroTargetRequest {
  nutrition_profile_id: string;
  target_type: MacroTargetType;
  protein_min?: number;
  protein_max?: number;
  carbs_min?: number;
  carbs_max?: number;
  fats_min?: number;
  fats_max?: number;
  fiber_min?: number;
  calories_min?: number;
  calories_max?: number;
}

// ============================================================================
// Juice Plan API Types
// ============================================================================

/**
 * Create juice plan request
 */
export interface CreateJuicePlanRequest {
  meal_plan_id: string;
  recipe_name: string;
  ingredients: Ingredient[];
  serving_size?: string;
  servings?: number;
  batch_date: string;
  good_until?: string;
  macros?: Macros;
  notes?: string;
}

/**
 * Juice plan response
 */
export type JuicePlanResponse = ApiResponse<JuicePlan>;

// ============================================================================
// User Preferences API Types
// ============================================================================

/**
 * Update user preferences request
 */
export interface UpdateUserPreferencesRequest {
  notification_settings?: {
    questionnaire_time?: string;
    daily_checkin_time?: string;
    evening_reminder_time?: string;
    location_reminders?: boolean;
  };
  theme?: string;
  language?: string;
  timezone?: string;
}

/**
 * User preferences response
 */
export type UserPreferencesResponse = ApiResponse<UserPreferences>;

// ============================================================================
// Analytics & Insights API Types
// ============================================================================

/**
 * Top 15 foods coverage for a week
 */
export interface Top15FoodCoverage {
  food: string;
  included_this_week: boolean;
  occurrences?: number;
}

/**
 * Top 15 coverage response
 */
export type Top15CoverageResponse = ApiResponse<Top15FoodCoverage[]>;

/**
 * Weekly nutrition summary
 */
export interface WeeklyNutritionSummary {
  week_start: string;
  week_end: string;
  total_macros: Macros;
  daily_average_macros: Macros;
  top_15_coverage: number;
  meal_variety_score: number;
}

/**
 * Weekly nutrition summary response
 */
export type WeeklyNutritionSummaryResponse = ApiResponse<WeeklyNutritionSummary>;

/**
 * Recipe statistics
 */
export interface RecipeStats {
  recipe_id: string;
  recipe_name: string;
  times_used: number;
  avg_rating: number;
  avg_kid_rating: number;
  would_make_again_percentage: number;
}

/**
 * Top recipes response
 */
export type TopRecipesResponse = ApiResponse<RecipeStats[]>;
