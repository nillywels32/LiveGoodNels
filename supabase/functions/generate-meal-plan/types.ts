/**
 * Type definitions for generate-meal-plan Edge Function
 */

export interface MacroTargets {
  protein: number;
  carbs: number;
  fats: number;
  fiber: number;
  calories: number;
}

export interface Ingredient {
  name: string;
  quantity: number;
  unit: string;
  category: string;
}

export interface Recipe {
  name: string;
  prepTime: number;
  cookTime: number;
  servings: number;
  macros: MacroTargets;
  ingredients: Ingredient[];
  instructions: string[];
  kidFriendlyNotes?: string;
  ageTasks?: string[];
  top15Foods?: string[];
}

export interface JuiceRecipe {
  name: string;
  batchDate: string;
  goodUntil: string;
  servings: number;
  ingredients: Ingredient[];
  instructions: string[];
  macros: MacroTargets;
}

export interface DailyMeals {
  day: string;
  dayType: "training_day" | "rest_day" | "fasting" | "baseline";
  breakfast: Recipe;
  lunch: Recipe;
  dinner: Recipe;
  snacks: Recipe[];
  juice: JuiceRecipe;
  smoothie?: Recipe;
  dailyMacros: MacroTargets;
}

export interface ShoppingItem {
  name: string;
  quantity: number;
  unit: string;
  category: string;
  suggestedStore?: string;
  priority?: "high" | "medium" | "low";
  usedInMeals?: string[];
}

export interface TopFoodsCoverage {
  broccoliSprouts?: number;
  turmeric?: number;
  blueberries?: number;
  broccoli?: number;
  flaxseed?: number;
  darkLeafyGreens?: number;
  garlic?: number;
  mushrooms?: number;
  cacao?: number;
  tigernuts?: number;
  gingerRoot?: number;
  grapes?: number;
  tomatoes?: number;
  lemon?: number;
  quinoa?: number;
}

export interface MealPlan {
  weekStart: string;
  weekEnd: string;
  meals: DailyMeals[];
  weeklyMacros: MacroTargets;
  shoppingList: ShoppingItem[];
  topFoodsCoverage: TopFoodsCoverage;
}

export interface InventoryItem {
  name: string;
  quantity: number;
  unit: string;
  category: string;
  expirationDate?: string;
}

export interface QuestionnaireResponse {
  userId: string;
  responses: {
    cravings?: string[];
    energyLevel?: string;
    workoutSchedule?: string[];
    socialEvents?: string[];
    cookingTime?: Record<string, number>;
    fastingDays?: string[];
    preferences?: string[];
  };
}

export interface NutritionProfile {
  familyId: string;
  avoidFoods?: string[];
  favoriteFoods?: string[];
  dietaryRestrictions?: string[];
  healthGoals?: string[];
}

export interface FoodFrequencyRules {
  top15Foods: string[];
  targetFrequency: Record<string, number>;
}

export interface HistoricalContext {
  lovedMeals?: string[];
  dislikedMeals?: string[];
  kidPreferences?: {
    loved?: string[];
    disliked?: string[];
    neutral?: string[];
  };
  prepTimeAccuracy?: Record<string, number>;
}

export interface MealPlanInput {
  questionnaireResponses: QuestionnaireResponse[];
  nutritionProfile: NutritionProfile;
  inventory: InventoryItem[];
  foodFrequencyRules: FoodFrequencyRules;
  macroTargets: Record<string, MacroTargets>;
  historicalContext?: HistoricalContext;
  weekStart: string;
  constraints?: {
    expiringItems?: string[];
    socialEvents?: string[];
    cookingSchedule?: Record<string, string>;
    specialDays?: Record<string, string>;
  };
}

export interface MealPlanResponse {
  mealPlan: MealPlan;
  usage: {
    inputTokens: number;
    outputTokens: number;
  };
}

export interface ErrorResponse {
  error: string;
  details?: unknown;
  timestamp: string;
}
