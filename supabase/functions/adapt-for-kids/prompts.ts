/**
 * AI Prompts for adapt-for-kids Edge Function
 *
 * Based on AI_PROMPT_LIBRARY.md
 */

import type { AdaptForKidsInput } from "./types.ts";

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

Family Context:
- 2 adults (active lifestyle, health-conscious)
- 2 young children (ages 2-3, picky eaters)
- Goals: More fiber, protein, nutrients for kids; less processed carbs and bad fats
- Busy schedules require efficient meal prep
- Emphasis on family involvement in meal preparation

Your role is to create thoughtful, practical meal plans that honor these principles while adapting to real-life constraints.`;

/**
 * Kid adaptation system prompt
 */
export const KID_ADAPT_SYSTEM_PROMPT = `${BASE_SYSTEM_PROMPT}

You are adapting an adult meal recipe to be more appealing and appropriate for young children (ages 2-3).

Requirements:
- Make it fun and visually appealing
- Suggest creative presentations (deconstructed bowls, fun shapes, colorful arrangements)
- Hide or minimize strong flavors kids might reject
- Maintain nutritional value
- Suggest age-appropriate involvement tasks
- Consider texture preferences (many toddlers prefer crunchy or smooth, not mushy)
- Keep safety in mind (no choking hazards)

Output must be valid JSON.`;

/**
 * Build the user prompt for kid adaptation
 */
export function buildKidAdaptUserPrompt(input: AdaptForKidsInput): string {
  const { recipe, kidAges, kidPreferences, nutritionGoals } = input;

  return `Adapt this adult recipe for kids ages ${kidAges.join(" and ")}:

ORIGINAL RECIPE:
${JSON.stringify(recipe, null, 2)}

KIDS' PAST PREFERENCES:
Loved: ${kidPreferences.loved?.join(", ") || "None specified"}
Disliked: ${kidPreferences.disliked?.join(", ") || "None specified"}
Neutral: ${kidPreferences.neutral?.join(", ") || "None specified"}

TEXTURE PREFERENCES:
Likes: ${kidPreferences.texturePreferences?.likes?.join(", ") || "Not specified"}
Dislikes: ${kidPreferences.texturePreferences?.dislikes?.join(", ") || "Not specified"}

COLOR PREFERENCES:
${kidPreferences.colorPreferences?.join(", ") || "Not specified"}

DIETARY GOALS FOR KIDS:
- More fiber: ${nutritionGoals?.increaseFiber ? "Yes" : "No"}
- More protein: ${nutritionGoals?.increaseProtein ? "Yes" : "No"}
- More nutrients: Yes
- Less processed carbs: ${nutritionGoals?.reduceProcessedCarbs ? "Yes" : "No"}
- Less bad fats: ${nutritionGoals?.reduceBadFats ? "Yes" : "No"}

Generate a kid-friendly adaptation with creative presentation ideas.

OUTPUT FORMAT:
{
  "kidFriendlyRecipe": {
    "name": "Fun version of recipe name (e.g., 'Rainbow Power Bowl' instead of 'Quinoa Bowl')",
    "presentation": "Describe how to plate it appealingly for toddlers. Be specific and creative.",
    "modifications": [
      "Blend spinach into sauce to hide it",
      "Cut vegetables into fun star shapes",
      "Serve components separately so kids can 'build' their meal"
    ],
    "hiddenNutrients": [
      "Spinach blended into tomato sauce",
      "Cauliflower rice mixed with regular rice (50/50)"
    ],
    "ageTasks": {
      "2-3": ["Wash vegetables", "Tear lettuce", "Stir bowl", "Pour water"]
    },
    "servingTips": [
      "Let kids choose their toppings",
      "Use small portions initially - they can ask for more",
      "Make it colorful - arrange in a rainbow"
    ],
    "ingredients": [
      { "name": "Organic spinach", "quantity": 1, "unit": "cup", "category": "produce" }
    ],
    "instructions": ["Step 1", "Step 2"],
    "macros": { "protein": 15, "carbs": 30, "fats": 8, "fiber": 6, "calories": 250 },
    "funFactor": "Kids love building their own bowls and choosing colors!"
  }
}

Generate the kid-friendly adaptation now.`;
}
