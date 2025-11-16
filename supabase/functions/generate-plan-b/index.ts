/**
 * Generate Plan B Edge Function
 *
 * Generates an alternative meal suggestion using Claude Sonnet 4.5
 * when a user rejects a planned meal
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
import { PLAN_B_SYSTEM_PROMPT, buildPlanBUserPrompt } from "./prompts.ts";
import {
  validatePlanBInput,
  validateAlternativeMeal,
  calculateMacroDifference,
} from "./utils.ts";
import type { PlanBInput, PlanBResponse } from "./types.ts";

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
    const input = validatePlanBInput(body);

    // Initialize Anthropic client
    const apiKey = getAnthropicApiKey();
    const client = createAnthropicClient({ apiKey });

    // Build prompts
    const systemPrompt = PLAN_B_SYSTEM_PROMPT;
    const userPrompt = buildPlanBUserPrompt(input);

    console.log("Generating Plan B for meal:", input.rejectedMeal.name);
    console.log("Rejection reason:", input.rejectionReason || "Not specified");

    // Call Claude API with retry logic
    const response = await retryWithBackoff(async () => {
      return await sendMessageWithJSON<{ alternativeMeal: unknown }>(client, {
        systemPrompt,
        userPrompt,
        temperature: 0.8, // More creativity for alternatives
        maxTokens: 2048,
      });
    });

    // Validate the AI response
    const alternativeMeal = validateAlternativeMeal(response.data.alternativeMeal);

    // Calculate macro difference for logging
    const macroDiff = calculateMacroDifference(
      input.rejectedMeal.macros,
      alternativeMeal.macros
    );

    console.log("Alternative meal generated:", alternativeMeal.name);
    console.log("Macro difference:", macroDiff);
    console.log("Token usage:", response.usage);

    // Return successful response
    const result: PlanBResponse = {
      alternativeMeal,
      usage: response.usage,
    };

    return jsonResponse(result);
  } catch (error) {
    console.error("Error generating Plan B:", error);

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
      "Failed to generate alternative meal",
      500,
      error.message
    );
  }
});
