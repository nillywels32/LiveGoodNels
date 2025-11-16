/**
 * Type definitions for adapt-for-kids Edge Function
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
  id?: string;
  name: string;
  prepTime: number;
  cookTime: number;
  servings: number;
  macros: MacroTargets;
  ingredients: Ingredient[];
  instructions: string[];
  description?: string;
}

export interface KidPreferences {
  loved?: string[];
  disliked?: string[];
  neutral?: string[];
  texturePreferences?: {
    likes?: string[]; // e.g., "crunchy", "smooth", "creamy"
    dislikes?: string[]; // e.g., "mushy", "slimy"
  };
  colorPreferences?: string[];
}

export interface AgeSpecificTasks {
  "2-3"?: string[];
  "3-4"?: string[];
  "4-5"?: string[];
}

export interface KidFriendlyRecipe {
  name: string;
  presentation: string;
  modifications: string[];
  hiddenNutrients: string[];
  ageTasks: AgeSpecificTasks;
  servingTips: string[];
  ingredients: Ingredient[];
  instructions: string[];
  macros?: MacroTargets;
  funFactor?: string;
}

export interface AdaptForKidsInput {
  recipe: Recipe;
  kidAges: number[];
  kidPreferences: KidPreferences;
  nutritionGoals?: {
    increaseProtein?: boolean;
    increaseFiber?: boolean;
    reduceProcessedCarbs?: boolean;
    reduceBadFats?: boolean;
  };
}

export interface AdaptForKidsResponse {
  kidFriendlyRecipe: KidFriendlyRecipe;
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
