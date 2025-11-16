/**
 * Utility functions for generate-meal-plan Edge Function
 */

import type { MealPlan, MealPlanInput } from "./types.ts";

/**
 * Validate meal plan input
 */
export function validateMealPlanInput(input: unknown): MealPlanInput {
  const data = input as MealPlanInput;

  if (!data.weekStart) {
    throw new Error("weekStart is required");
  }

  if (!data.questionnaireResponses || !Array.isArray(data.questionnaireResponses)) {
    throw new Error("questionnaireResponses must be an array");
  }

  if (data.questionnaireResponses.length === 0) {
    throw new Error("At least one questionnaire response is required");
  }

  if (!data.nutritionProfile) {
    throw new Error("nutritionProfile is required");
  }

  if (!data.inventory || !Array.isArray(data.inventory)) {
    throw new Error("inventory must be an array");
  }

  if (!data.macroTargets) {
    throw new Error("macroTargets is required");
  }

  // Validate date format (YYYY-MM-DD)
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(data.weekStart)) {
    throw new Error("weekStart must be in YYYY-MM-DD format");
  }

  return data;
}

/**
 * Validate meal plan response from AI
 */
export function validateMealPlan(mealPlan: unknown): MealPlan {
  const plan = mealPlan as MealPlan;

  if (!plan.meals || !Array.isArray(plan.meals)) {
    throw new Error("Meal plan must have meals array");
  }

  if (plan.meals.length !== 7) {
    throw new Error("Meal plan must have exactly 7 days");
  }

  const requiredDays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  plan.meals.forEach((day, index) => {
    if (!day.day || !requiredDays.includes(day.day)) {
      throw new Error(`Day ${index + 1} has invalid day name: ${day.day}`);
    }

    if (!day.breakfast || !day.lunch || !day.dinner) {
      throw new Error(`${day.day} is missing required meals`);
    }

    // Validate macros are reasonable
    if (
      day.dailyMacros.calories < 800 ||
      day.dailyMacros.calories > 4000
    ) {
      throw new Error(`${day.day} has unrealistic calorie count: ${day.dailyMacros.calories}`);
    }

    // Validate each meal has required fields
    [day.breakfast, day.lunch, day.dinner].forEach((meal) => {
      if (!meal.name || !meal.macros || !meal.ingredients || !meal.instructions) {
        throw new Error(`Meal in ${day.day} is missing required fields`);
      }
    });

    // Validate juice
    if (!day.juice || !day.juice.name) {
      throw new Error(`${day.day} is missing juice`);
    }
  });

  if (!plan.shoppingList || !Array.isArray(plan.shoppingList)) {
    throw new Error("Meal plan must have shopping list");
  }

  if (!plan.weeklyMacros) {
    throw new Error("Meal plan must have weekly macros");
  }

  if (!plan.topFoodsCoverage) {
    throw new Error("Meal plan must have top foods coverage");
  }

  return plan;
}

/**
 * Calculate week end date from week start
 */
export function calculateWeekEnd(weekStart: string): string {
  const date = new Date(weekStart);
  date.setDate(date.getDate() + 6);
  return date.toISOString().split("T")[0];
}

/**
 * Summarize historical context to reduce token usage
 */
export function summarizeHistoricalContext(
  historicalContext?: Record<string, unknown>
): Record<string, unknown> | undefined {
  if (!historicalContext) {
    return undefined;
  }

  // Keep only the most relevant information
  return {
    lovedMeals: Array.isArray(historicalContext.lovedMeals)
      ? historicalContext.lovedMeals.slice(0, 10)
      : [],
    dislikedMeals: Array.isArray(historicalContext.dislikedMeals)
      ? historicalContext.dislikedMeals.slice(0, 10)
      : [],
    kidPreferences: historicalContext.kidPreferences || {},
  };
}

/**
 * Get expiring items from inventory
 */
export function getExpiringItems(
  inventory: MealPlanInput["inventory"],
  daysThreshold = 5
): string[] {
  const now = new Date();
  const threshold = new Date();
  threshold.setDate(threshold.getDate() + daysThreshold);

  return inventory
    .filter((item) => {
      if (!item.expirationDate) return false;
      const expirationDate = new Date(item.expirationDate);
      return expirationDate >= now && expirationDate <= threshold;
    })
    .map((item) => item.name);
}
