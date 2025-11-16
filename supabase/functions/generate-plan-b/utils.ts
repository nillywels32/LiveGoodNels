/**
 * Utility functions for generate-plan-b Edge Function
 */

import type { PlanBInput, AlternativeMeal } from "./types.ts";

/**
 * Validate Plan B input
 */
export function validatePlanBInput(input: unknown): PlanBInput {
  const data = input as PlanBInput;

  if (!data.rejectedMeal) {
    throw new Error("rejectedMeal is required");
  }

  if (!data.rejectedMeal.name) {
    throw new Error("rejectedMeal.name is required");
  }

  if (!data.rejectedMeal.macros) {
    throw new Error("rejectedMeal.macros is required");
  }

  if (!data.mealType) {
    throw new Error("mealType is required");
  }

  const validMealTypes = ["breakfast", "lunch", "dinner", "snack"];
  if (!validMealTypes.includes(data.mealType)) {
    throw new Error(`mealType must be one of: ${validMealTypes.join(", ")}`);
  }

  if (!data.inventory || !Array.isArray(data.inventory)) {
    throw new Error("inventory must be an array");
  }

  if (!data.preferences) {
    throw new Error("preferences is required");
  }

  return data;
}

/**
 * Validate alternative meal response from AI
 */
export function validateAlternativeMeal(meal: unknown): AlternativeMeal {
  const altMeal = meal as AlternativeMeal;

  if (!altMeal.name) {
    throw new Error("Alternative meal must have a name");
  }

  if (!altMeal.macros) {
    throw new Error("Alternative meal must have macros");
  }

  if (!altMeal.ingredients || !Array.isArray(altMeal.ingredients)) {
    throw new Error("Alternative meal must have ingredients array");
  }

  if (altMeal.ingredients.length === 0) {
    throw new Error("Alternative meal must have at least one ingredient");
  }

  if (!altMeal.instructions || !Array.isArray(altMeal.instructions)) {
    throw new Error("Alternative meal must have instructions array");
  }

  if (altMeal.instructions.length === 0) {
    throw new Error("Alternative meal must have at least one instruction");
  }

  // Validate macros are reasonable
  if (altMeal.macros.calories < 100 || altMeal.macros.calories > 1500) {
    throw new Error(`Alternative meal has unrealistic calorie count: ${altMeal.macros.calories}`);
  }

  // Validate prep and cook times
  if (altMeal.prepTime && (altMeal.prepTime < 0 || altMeal.prepTime > 180)) {
    throw new Error(`Unrealistic prep time: ${altMeal.prepTime} minutes`);
  }

  if (altMeal.cookTime && (altMeal.cookTime < 0 || altMeal.cookTime > 180)) {
    throw new Error(`Unrealistic cook time: ${altMeal.cookTime} minutes`);
  }

  return altMeal;
}

/**
 * Calculate macro difference between original and alternative meals
 */
export function calculateMacroDifference(
  original: PlanBInput["rejectedMeal"]["macros"],
  alternative: AlternativeMeal["macros"]
): {
  proteinDiff: number;
  carbsDiff: number;
  fatsDiff: number;
  caloriesDiff: number;
} {
  return {
    proteinDiff: alternative.protein - original.protein,
    carbsDiff: alternative.carbs - original.carbs,
    fatsDiff: alternative.fats - original.fats,
    caloriesDiff: alternative.calories - original.calories,
  };
}

/**
 * Check if inventory has sufficient ingredients
 */
export function checkInventoryCoverage(
  requiredIngredients: AlternativeMeal["ingredients"],
  inventory: PlanBInput["inventory"]
): {
  covered: boolean;
  missingItems: string[];
} {
  const inventoryMap = new Map(
    inventory.map((item) => [item.name.toLowerCase(), item])
  );

  const missingItems: string[] = [];

  for (const ingredient of requiredIngredients) {
    const inventoryItem = inventoryMap.get(ingredient.name.toLowerCase());
    if (!inventoryItem) {
      missingItems.push(ingredient.name);
    }
  }

  return {
    covered: missingItems.length === 0,
    missingItems,
  };
}
