/**
 * Enumerations for GoodLifeNels application
 */

/**
 * Days of the week
 */
export enum DayOfWeek {
  Monday = 'Monday',
  Tuesday = 'Tuesday',
  Wednesday = 'Wednesday',
  Thursday = 'Thursday',
  Friday = 'Friday',
  Saturday = 'Saturday',
  Sunday = 'Sunday',
}

/**
 * Types of meals
 */
export enum MealType {
  Breakfast = 'breakfast',
  Lunch = 'lunch',
  Dinner = 'dinner',
  Snack = 'snack',
  Juice = 'juice',
  Smoothie = 'smoothie',
}

/**
 * Family member role
 */
export enum FamilyRole {
  Adult = 'adult',
  Child = 'child',
}

/**
 * Meal plan status
 */
export enum MealPlanStatus {
  Draft = 'draft',
  Active = 'active',
  Completed = 'completed',
  Archived = 'archived',
}

/**
 * Shopping list status
 */
export enum ShoppingListStatus {
  Pending = 'pending',
  InProgress = 'in_progress',
  Completed = 'completed',
}

/**
 * Recipe source
 */
export enum RecipeSource {
  Curated = 'curated',
  AIGenerated = 'ai-generated',
  UserCreated = 'user-created',
}

/**
 * Recipe difficulty level
 */
export enum RecipeDifficulty {
  Easy = 'easy',
  Medium = 'medium',
  Hard = 'hard',
}

/**
 * Kid acceptance level for meal feedback
 */
export enum KidAcceptance {
  Loved = 'loved',
  Liked = 'liked',
  Neutral = 'neutral',
  Disliked = 'disliked',
  Refused = 'refused',
}

/**
 * Macro target type
 */
export enum MacroTargetType {
  Baseline = 'baseline',
  TrainingDay = 'training_day',
  RestDay = 'rest_day',
  Fasting = 'fasting',
}

/**
 * Food frequency priority
 */
export enum FoodFrequencyPriority {
  Required = 'required',
  High = 'high',
  Normal = 'normal',
  Low = 'low',
}

/**
 * Shopping item priority
 */
export enum ShoppingItemPriority {
  High = 'high',
  Normal = 'normal',
  Low = 'low',
}

/**
 * Inventory storage location
 */
export enum InventoryLocation {
  Fridge = 'fridge',
  Freezer = 'freezer',
  Pantry = 'pantry',
}

/**
 * Ingredient category
 */
export enum IngredientCategory {
  Produce = 'produce',
  Dairy = 'dairy',
  Meat = 'meat',
  Grains = 'grains',
  Spices = 'spices',
  Condiments = 'condiments',
  Supplements = 'supplements',
  Other = 'other',
}

/**
 * App theme
 */
export enum Theme {
  Nature = 'nature',
  Light = 'light',
  Dark = 'dark',
}
