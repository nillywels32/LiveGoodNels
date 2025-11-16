/**
 * Generate Meal Plan Edge Function
 *
 * Generates a complete 7-day meal plan using Claude Sonnet 4.5
 * Based on questionnaire responses, nutrition profile, and inventory
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
import { MEAL_PLAN_SYSTEM_PROMPT, buildMealPlanUserPrompt } from "./prompts.ts";
import {
  validateMealPlanInput,
  validateMealPlan,
  calculateWeekEnd,
  summarizeHistoricalContext,
  getExpiringItems,
} from "./utils.ts";
import type { MealPlanInput, MealPlanResponse } from "./types.ts";

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
    const input = validateMealPlanInput(body);

    // Initialize Anthropic client
    const apiKey = getAnthropicApiKey();
    const client = createAnthropicClient({ apiKey });

    // Prepare input with optimizations
    const optimizedInput: MealPlanInput = {
      ...input,
      historicalContext: summarizeHistoricalContext(input.historicalContext),
      constraints: {
        ...input.constraints,
        expiringItems: input.constraints?.expiringItems || getExpiringItems(input.inventory),
      },
    };

    // Build prompts
    const systemPrompt = MEAL_PLAN_SYSTEM_PROMPT;
    const userPrompt = buildMealPlanUserPrompt(optimizedInput);

    console.log("Generating meal plan for week:", input.weekStart);
    console.log("User prompt length:", userPrompt.length);

    // Call Claude API with retry logic
    const response = await retryWithBackoff(async () => {
      return await sendMessageWithJSON<{ mealPlan: unknown }>(client, {
        systemPrompt,
        userPrompt,
        temperature: 0.7, // Creative but consistent
        maxTokens: 4096,
      });
    });

    // Validate the AI response
    const mealPlan = validateMealPlan(response.data.mealPlan);

    // Calculate week end if not provided
    if (!mealPlan.weekEnd) {
      mealPlan.weekEnd = calculateWeekEnd(input.weekStart);
    }

    // Log token usage
    console.log("Meal plan generated successfully");
    console.log("Token usage:", response.usage);

    // Return successful response
    const result: MealPlanResponse = {
      mealPlan,
      usage: response.usage,
    };

    return jsonResponse(result);
  } catch (error) {
    console.error("Error generating meal plan:", error);

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
      "Failed to generate meal plan",
      500,
      error.message
    );
  }
});
