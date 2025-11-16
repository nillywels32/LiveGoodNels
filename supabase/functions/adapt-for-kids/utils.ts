/**
 * Utility functions for adapt-for-kids Edge Function
 */

import type { AdaptForKidsInput, KidFriendlyRecipe } from "./types.ts";

/**
 * Validate adapt-for-kids input
 */
export function validateAdaptForKidsInput(input: unknown): AdaptForKidsInput {
  const data = input as AdaptForKidsInput;

  if (!data.recipe) {
    throw new Error("recipe is required");
  }

  if (!data.recipe.name) {
    throw new Error("recipe.name is required");
  }

  if (!data.recipe.ingredients || !Array.isArray(data.recipe.ingredients)) {
    throw new Error("recipe.ingredients must be an array");
  }

  if (!data.recipe.instructions || !Array.isArray(data.recipe.instructions)) {
    throw new Error("recipe.instructions must be an array");
  }

  if (!data.kidAges || !Array.isArray(data.kidAges)) {
    throw new Error("kidAges must be an array");
  }

  if (data.kidAges.length === 0) {
    throw new Error("At least one kid age is required");
  }

  // Validate ages are reasonable (0-18)
  data.kidAges.forEach((age) => {
    if (age < 0 || age > 18) {
      throw new Error(`Invalid kid age: ${age} (must be 0-18)`);
    }
  });

  if (!data.kidPreferences) {
    throw new Error("kidPreferences is required");
  }

  return data;
}

/**
 * Validate kid-friendly recipe response from AI
 */
export function validateKidFriendlyRecipe(recipe: unknown): KidFriendlyRecipe {
  const kidRecipe = recipe as KidFriendlyRecipe;

  if (!kidRecipe.name) {
    throw new Error("Kid-friendly recipe must have a name");
  }

  if (!kidRecipe.presentation) {
    throw new Error("Kid-friendly recipe must have presentation details");
  }

  if (!kidRecipe.modifications || !Array.isArray(kidRecipe.modifications)) {
    throw new Error("Kid-friendly recipe must have modifications array");
  }

  if (!kidRecipe.ageTasks) {
    throw new Error("Kid-friendly recipe must have age-specific tasks");
  }

  if (!kidRecipe.servingTips || !Array.isArray(kidRecipe.servingTips)) {
    throw new Error("Kid-friendly recipe must have serving tips array");
  }

  if (!kidRecipe.ingredients || !Array.isArray(kidRecipe.ingredients)) {
    throw new Error("Kid-friendly recipe must have ingredients array");
  }

  if (kidRecipe.ingredients.length === 0) {
    throw new Error("Kid-friendly recipe must have at least one ingredient");
  }

  if (!kidRecipe.instructions || !Array.isArray(kidRecipe.instructions)) {
    throw new Error("Kid-friendly recipe must have instructions array");
  }

  if (kidRecipe.instructions.length === 0) {
    throw new Error("Kid-friendly recipe must have at least one instruction");
  }

  return kidRecipe;
}

/**
 * Determine age group for task recommendations
 */
export function getAgeGroup(ages: number[]): string {
  const minAge = Math.min(...ages);
  const maxAge = Math.max(...ages);

  if (maxAge <= 3) {
    return "2-3";
  } else if (minAge >= 4 && maxAge <= 5) {
    return "4-5";
  } else if (minAge >= 3 && maxAge <= 4) {
    return "3-4";
  } else {
    return "2-3"; // Default to youngest group
  }
}

/**
 * Check if recipe contains common allergens
 */
export function checkForAllergens(
  ingredients: AdaptForKidsInput["recipe"]["ingredients"]
): string[] {
  const allergens: string[] = [];
  const commonAllergens = {
    dairy: ["milk", "cheese", "yogurt", "butter", "cream"],
    nuts: ["peanut", "almond", "walnut", "cashew", "pecan"],
    shellfish: ["shrimp", "crab", "lobster"],
    soy: ["soy", "tofu", "tempeh", "edamame"],
    wheat: ["wheat", "flour", "bread", "pasta"],
    eggs: ["egg"],
  };

  ingredients.forEach((ingredient) => {
    const nameLower = ingredient.name.toLowerCase();

    for (const [allergen, keywords] of Object.entries(commonAllergens)) {
      if (keywords.some((keyword) => nameLower.includes(keyword))) {
        if (!allergens.includes(allergen)) {
          allergens.push(allergen);
        }
      }
    }
  });

  return allergens;
}

/**
 * Identify potential choking hazards for toddlers
 */
export function identifyChokingHazards(
  ingredients: AdaptForKidsInput["recipe"]["ingredients"]
): string[] {
  const hazards: string[] = [];
  const chokingHazardKeywords = [
    "whole grape",
    "cherry tomato",
    "hot dog",
    "carrot (raw)",
    "apple (raw)",
    "popcorn",
    "nut",
    "hard candy",
  ];

  ingredients.forEach((ingredient) => {
    const nameLower = ingredient.name.toLowerCase();

    chokingHazardKeywords.forEach((hazard) => {
      if (nameLower.includes(hazard.split(" (")[0])) {
        hazards.push(ingredient.name);
      }
    });
  });

  return hazards;
}
