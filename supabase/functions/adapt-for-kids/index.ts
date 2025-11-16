/**
 * Adapt for Kids Edge Function
 *
 * Adapts adult recipes to be kid-friendly using Claude Sonnet 4.5
 * with creative presentations and age-appropriate tasks
 */

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import {
  createAnthropicClient,
  getAnthropicApiKey,
  sendMessageWithJSON,
  retryWithBackoff,
} from "../_shared/anthropic.ts";
import {
  corsHeaders,
  errorResponse,
  handleOptions,
  isMethodAllowed,
  jsonResponse,
} from "../_shared/cors.ts";
import { KID_ADAPT_SYSTEM_PROMPT, buildKidAdaptUserPrompt } from "./prompts.ts";
import {
  validateAdaptForKidsInput,
  validateKidFriendlyRecipe,
  getAgeGroup,
  checkForAllergens,
  identifyChokingHazards,
} from "./utils.ts";
import type { AdaptForKidsInput, AdaptForKidsResponse } from "./types.ts";

serve(async (req: Request) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return handleOptions();
  }

  // Validate HTTP method
  if (!isMethodAllowed(req, ["POST"])) {
    return errorResponse("Method not allowed", 405);
  }

  try {
    // Parse and validate request body
    const body = await req.json();
    const input = validateAdaptForKidsInput(body);

    // Check for allergens and choking hazards
    const allergens = checkForAllergens(input.recipe.ingredients);
    const chokingHazards = identifyChokingHazards(input.recipe.ingredients);

    if (allergens.length > 0) {
      console.log("Allergens detected:", allergens.join(", "));
    }

    if (chokingHazards.length > 0) {
      console.warn("Potential choking hazards detected:", chokingHazards.join(", "));
    }

    // Initialize Anthropic client
    const apiKey = getAnthropicApiKey();
    const client = createAnthropicClient({ apiKey });

    // Build prompts
    const systemPrompt = KID_ADAPT_SYSTEM_PROMPT;
    const userPrompt = buildKidAdaptUserPrompt(input);

    console.log("Adapting recipe for kids:", input.recipe.name);
    console.log("Kid ages:", input.kidAges.join(", "));
    console.log("Age group:", getAgeGroup(input.kidAges));

    // Call Claude API with retry logic
    const response = await retryWithBackoff(async () => {
      return await sendMessageWithJSON<{ kidFriendlyRecipe: unknown }>(client, {
        systemPrompt,
        userPrompt,
        temperature: 0.9, // Maximum creativity for kid engagement
        maxTokens: 2048,
      });
    });

    // Validate the AI response
    const kidFriendlyRecipe = validateKidFriendlyRecipe(
      response.data.kidFriendlyRecipe
    );

    console.log("Kid-friendly recipe created:", kidFriendlyRecipe.name);
    console.log("Modifications count:", kidFriendlyRecipe.modifications.length);
    console.log("Token usage:", response.usage);

    // Return successful response
    const result: AdaptForKidsResponse = {
      kidFriendlyRecipe,
      usage: response.usage,
    };

    return jsonResponse(result);
  } catch (error) {
    console.error("Error adapting recipe for kids:", error);

    // Handle specific error types
    if (error.message.includes("ANTHROPIC_API_KEY")) {
      return errorResponse("Configuration error", 500, error.message);
    }

    if (error.message.includes("required") || error.message.includes("invalid")) {
      return errorResponse("Validation error", 400, error.message);
    }

    if (error.message.includes("Claude")) {
      return errorResponse(
        "AI service temporarily unavailable",
        503,
        error.message
      );
    }

    // Generic error
    return errorResponse(
      "Failed to adapt recipe for kids",
      500,
      error.message
    );
  }
});
