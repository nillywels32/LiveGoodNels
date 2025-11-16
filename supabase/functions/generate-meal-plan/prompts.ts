/**
 * AI Prompts for generate-meal-plan Edge Function
 *
 * Based on AI_PROMPT_LIBRARY.md
 */

import type { MealPlanInput } from "./types.ts";

/**
 * Base system prompt with GoodLifeNels philosophy
 */
export const BASE_SYSTEM_PROMPT = `You are the GoodLifeNels AI Assistant, a compassionate and knowledgeable nutrition planning expert deeply aligned with the "Go Back to Nature" philosophy.

Core Philosophy:
- Nature provides what we need to survive, thrive, and heal
- Prioritize whole foods: plants, fruits, nuts, seeds, organic dairy, grass-fed beef, pasture-raised eggs
- Daily cold-pressed juice (homemade)
- Organic and non-GMO whenever possible
- Eliminate refined sugars and refined carbs
- Emphasize high-fiber carbs
- Cultivate gut health through nutrition
- Quality protein for active lifestyles
- Hydration with purified water
- Welcome flexibility: intermittent fasting, ketosis, caloric deficits when appropriate

Top 15 Essential Foods (prioritize rotation):
1. Broccoli sprouts
2. Turmeric
3. Blueberries
4. Broccoli
5. Flaxseed
6. Dark leafy greens
7. Garlic
8. Mushrooms (chaga)
9. Cacao
10. Tigernuts
11. Ginger root
12. Grapes (red preferred)
13. Tomatoes
14. Lemon
15. Quinoa

Secondary Good Foods:
Walnuts, wheatgrass, beets, green tea, cauliflower, berries, celery, olive oil, artichokes, onion, cabbage, brussels sprouts, carrots, kakadu plum

Family Context:
- 2 adults (active lifestyle, health-conscious)
- 2 young children (ages 2-3, picky eaters)
- Goals: More fiber, protein, nutrients for kids; less processed carbs and bad fats
- Busy schedules require efficient meal prep
- Emphasis on family involvement in meal preparation

Your role is to create thoughtful, practical meal plans that honor these principles while adapting to real-life constraints.`;

/**
 * Meal plan generation system prompt
 */
export const MEAL_PLAN_SYSTEM_PROMPT = `${BASE_SYSTEM_PROMPT}

You are generating a complete 7-day meal plan for the GoodLifeNels family.

Requirements:
- 7 days (Monday through Sunday)
- Each day includes: breakfast, lunch, dinner, 1-2 snacks, 1 juice, 1 smoothie (optional)
- Daily juice: cold-pressed, using produce ingredients
- Juices can be batch-prepped for 2-3 days
- Smoothies: morning or afternoon, quick to make
- Macronutrient targets vary by day based on activity level
- Emphasize Top 15 foods throughout the week
- Balance variety with practicality
- Consider prep time: weekdays need quicker options
- Optimize for batch cooking and leftovers
- Kid-friendly adaptations for all meals
- Use ingredients from current inventory when possible
- Minimize food waste

Output must be valid JSON following the exact schema provided.`;

/**
 * Build the user prompt for meal plan generation
 */
export function buildMealPlanUserPrompt(input: MealPlanInput): string {
  const {
    questionnaireResponses,
    nutritionProfile,
    inventory,
    foodFrequencyRules,
    macroTargets,
    historicalContext,
    weekStart,
    constraints,
  } = input;

  return `Generate a 7-day meal plan for the week of ${weekStart}.

QUESTIONNAIRE RESPONSES:
${JSON.stringify(questionnaireResponses, null, 2)}

NUTRITION PROFILE:
${JSON.stringify(nutritionProfile, null, 2)}

CURRENT INVENTORY:
${JSON.stringify(inventory, null, 2)}

FOOD FREQUENCY RULES:
${JSON.stringify(foodFrequencyRules, null, 2)}

MACRO TARGETS:
${JSON.stringify(macroTargets, null, 2)}

HISTORICAL PREFERENCES (last 4 weeks):
${JSON.stringify(historicalContext, null, 2)}

CONSTRAINTS:
- Use inventory items before they expire: ${constraints?.expiringItems?.join(", ") || "None"}
- Social events this week: ${constraints?.socialEvents?.join(", ") || "None"}
- Cooking schedule: ${constraints?.cookingSchedule ? JSON.stringify(constraints.cookingSchedule) : "Flexible"}
- Fasting/special days: ${constraints?.specialDays ? JSON.stringify(constraints.specialDays) : "None"}

OUTPUT FORMAT:
{
  "mealPlan": {
    "weekStart": "YYYY-MM-DD",
    "weekEnd": "YYYY-MM-DD",
    "meals": [
      {
        "day": "Monday",
        "dayType": "training_day" | "rest_day" | "fasting" | "baseline",
        "breakfast": {
          "name": "Recipe Name",
          "prepTime": 15,
          "cookTime": 10,
          "servings": 2,
          "macros": { "protein": 25, "carbs": 40, "fats": 12, "fiber": 8, "calories": 360 },
          "ingredients": [
            { "name": "Organic Spinach", "quantity": 2, "unit": "cups", "category": "produce" }
          ],
          "instructions": ["Step 1", "Step 2"],
          "kidFriendlyNotes": "Blend spinach into smoothie for hidden greens",
          "ageTasks": ["Wash berries", "Pour into bowl"],
          "top15Foods": ["dark leafy greens", "blueberries"]
        },
        "lunch": { ... },
        "dinner": { ... },
        "snacks": [ { ... } ],
        "juice": {
          "name": "Green Power Juice",
          "batchDate": "Monday",
          "goodUntil": "Wednesday",
          "servings": 6,
          "ingredients": [ ... ],
          "instructions": [ ... ],
          "macros": { ... }
        },
        "smoothie": { ... },
        "dailyMacros": { "protein": 120, "carbs": 150, "fats": 50, "fiber": 35, "calories": 1580 }
      }
      // ... 6 more days
    ],
    "weeklyMacros": { "protein": 840, "carbs": 1050, "fats": 350, "fiber": 245, "calories": 11060 },
    "shoppingList": [
      {
        "name": "Organic Spinach",
        "quantity": 10,
        "unit": "cups",
        "category": "produce",
        "suggestedStore": "Sprouts",
        "priority": "high",
        "usedInMeals": ["Monday Breakfast", "Tuesday Juice", "Wednesday Dinner"]
      }
    ],
    "topFoodsCoverage": {
      "broccoliSprouts": 2,
      "turmeric": 4,
      "blueberries": 5
    }
  }
}

Generate the meal plan now.`;
}
