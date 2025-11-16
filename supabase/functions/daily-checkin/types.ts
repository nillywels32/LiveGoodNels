/**
 * Type definitions for daily-checkin Edge Function
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

export interface Meal {
  name: string;
  prepTime: number;
  cookTime: number;
  ingredients: Ingredient[];
  macros: MacroTargets;
}

export interface TodaysMeals {
  breakfast?: Meal;
  lunch?: Meal;
  dinner?: Meal;
  snacks?: Meal[];
  juice?: Meal;
  smoothie?: Meal;
}

export interface ScheduleItem {
  time: string;
  activity: string;
  duration?: number;
}

export interface CheckinInput {
  userId: string;
  userName: string;
  date: string;
  dayOfWeek: string;
  todaysMeals: TodaysMeals;
  schedule?: ScheduleItem[];
  recentContext?: {
    energyLevel?: "low" | "medium" | "high";
    workoutToday?: boolean;
    cookingTonight?: string;
    yesterdayFeedback?: string;
  };
}

export interface CheckinMessage {
  greeting: string;
  mainMessage: string;
  questions: string[];
  suggestions?: string[];
  motivationalNote?: string;
}

export interface CheckinResponse {
  checkin: CheckinMessage;
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
