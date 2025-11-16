/**
 * Type definitions for generate-plan-b Edge Function
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

export interface RejectedMeal {
  id?: string;
  name: string;
  macros: MacroTargets;
  mealType: "breakfast" | "lunch" | "dinner" | "snack";
}

export interface InventoryItem {
  name: string;
  quantity: number;
  unit: string;
  category: string;
  expirationDate?: string;
}

export interface Preferences {
  favoriteFoods?: string[];
  avoidFoods?: string[];
  cuisinePreferences?: string[];
  prepTimeMax?: number;
}

export interface MissingIngredient {
  name: string;
  suggestedStore?: string;
  estimatedCost?: string;
}

export interface AlternativeMeal extends Recipe {
  missingIngredients?: MissingIngredient[];
}

export interface PlanBInput {
  rejectedMeal: RejectedMeal;
  rejectionReason?: string;
  inventory: InventoryItem[];
  preferences: Preferences;
  mealType: "breakfast" | "lunch" | "dinner" | "snack";
}

export interface PlanBResponse {
  alternativeMeal: AlternativeMeal;
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
