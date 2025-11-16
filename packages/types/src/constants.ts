/**
 * Constants for GoodLifeNels application
 */

/**
 * Top 15 longevity foods based on Go Back to Nature philosophy
 */
export const TOP_15_FOODS = [
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
  'Quinoa',
] as const;

/**
 * Type for top 15 foods
 */
export type Top15Food = typeof TOP_15_FOODS[number];

/**
 * Common dietary restrictions
 */
export const DIETARY_RESTRICTIONS = [
  'dairy',
  'gluten',
  'nuts',
  'soy',
  'eggs',
  'shellfish',
  'fish',
  'peanuts',
  'wheat',
  'sesame',
] as const;

/**
 * Type for dietary restrictions
 */
export type DietaryRestriction = typeof DIETARY_RESTRICTIONS[number];

/**
 * Common recipe tags
 */
export const RECIPE_TAGS = [
  'vegan',
  'vegetarian',
  'gluten-free',
  'dairy-free',
  'paleo',
  'keto',
  'low-carb',
  'high-protein',
  'quick',
  'kid-friendly',
  'meal-prep',
  'freezer-friendly',
  'one-pot',
  'no-cook',
  'anti-inflammatory',
  'gut-health',
  'juice-cleanse',
  'organic',
  'non-gmo',
] as const;

/**
 * Type for recipe tags
 */
export type RecipeTag = typeof RECIPE_TAGS[number];

/**
 * Suggested grocery stores
 */
export const SUGGESTED_STORES = [
  'Costco',
  'Sprouts',
  'Whole Foods',
  'Trader Joe\'s',
  'Farmers Market',
  'Local Organic',
  'Asian Market',
  'Health Food Store',
] as const;

/**
 * Type for suggested stores
 */
export type SuggestedStore = typeof SUGGESTED_STORES[number];

/**
 * Meal type display names
 */
export const MEAL_TYPE_LABELS = {
  breakfast: 'Breakfast',
  lunch: 'Lunch',
  dinner: 'Dinner',
  snack: 'Snack',
  juice: 'Juice',
  smoothie: 'Smoothie',
} as const;

/**
 * Day of week display names
 */
export const DAY_OF_WEEK_LABELS = {
  Monday: 'Monday',
  Tuesday: 'Tuesday',
  Wednesday: 'Wednesday',
  Thursday: 'Thursday',
  Friday: 'Friday',
  Saturday: 'Saturday',
  Sunday: 'Sunday',
} as const;

/**
 * Day of week abbreviations
 */
export const DAY_OF_WEEK_ABBR = {
  Monday: 'Mon',
  Tuesday: 'Tue',
  Wednesday: 'Wed',
  Thursday: 'Thu',
  Friday: 'Fri',
  Saturday: 'Sat',
  Sunday: 'Sun',
} as const;

/**
 * Macro target ranges for different activity levels
 */
export const DEFAULT_MACRO_TARGETS = {
  baseline: {
    protein_min: 90,
    protein_max: 120,
    carbs_min: 120,
    carbs_max: 150,
    fats_min: 40,
    fats_max: 60,
    fiber_min: 30,
    calories_min: 1800,
    calories_max: 2200,
  },
  training_day: {
    protein_min: 120,
    protein_max: 150,
    carbs_min: 150,
    carbs_max: 200,
    fats_min: 50,
    fats_max: 70,
    fiber_min: 35,
    calories_min: 2200,
    calories_max: 2600,
  },
  rest_day: {
    protein_min: 80,
    protein_max: 100,
    carbs_min: 100,
    carbs_max: 130,
    fats_min: 35,
    fats_max: 50,
    fiber_min: 30,
    calories_min: 1600,
    calories_max: 1900,
  },
  fasting: {
    protein_min: 0,
    protein_max: 20,
    carbs_min: 0,
    carbs_max: 10,
    fats_min: 0,
    fats_max: 5,
    fiber_min: 0,
    calories_min: 0,
    calories_max: 200,
  },
} as const;

/**
 * Default notification times
 */
export const DEFAULT_NOTIFICATION_TIMES = {
  questionnaire_time: '10:00',
  daily_checkin_time: '09:00',
  evening_reminder_time: '21:00',
} as const;

/**
 * Maximum prep/cook time ranges for quick meals (in minutes)
 */
export const QUICK_MEAL_TIME = {
  max_prep_time: 15,
  max_cook_time: 30,
} as const;

/**
 * Inventory expiration warning thresholds (in days)
 */
export const EXPIRATION_THRESHOLDS = {
  urgent: 1,
  warning: 3,
  normal: 7,
} as const;

/**
 * Pagination defaults
 */
export const PAGINATION_DEFAULTS = {
  page: 1,
  pageSize: 20,
  maxPageSize: 100,
} as const;

/**
 * Default servings for different meal types
 */
export const DEFAULT_SERVINGS = {
  breakfast: 2,
  lunch: 2,
  dinner: 4,
  snack: 2,
  juice: 4,
  smoothie: 2,
} as const;
