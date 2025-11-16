/**
 * Daily Check-in Edge Function
 *
 * Generates a personalized morning check-in message using Claude Sonnet 4.5
 * based on today's meal plan and user's schedule
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
import { CHECKIN_SYSTEM_PROMPT, buildCheckinUserPrompt } from "./prompts.ts";
import {
  validateCheckinInput,
  validateCheckinMessage,
  summarizeSchedule,
} from "./utils.ts";
import type { CheckinInput, CheckinResponse } from "./types.ts";

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
    const input = validateCheckinInput(body);

    // Initialize Anthropic client
    const apiKey = getAnthropicApiKey();
    const client = createAnthropicClient({ apiKey });

    // Build prompts
    const systemPrompt = CHECKIN_SYSTEM_PROMPT;
    const userPrompt = buildCheckinUserPrompt(input);

    console.log("Generating daily check-in for:", input.userName);
    console.log("Date:", input.date, `(${input.dayOfWeek})`);
    console.log("Schedule:", summarizeSchedule(input.schedule));

    // Call Claude API with retry logic
    const response = await retryWithBackoff(async () => {
      return await sendMessageWithJSON<{ checkin: unknown }>(client, {
        systemPrompt,
        userPrompt,
        temperature: 0.6, // Consistent but personable
        maxTokens: 1024,
      });
    });

    // Validate the AI response
    const checkin = validateCheckinMessage(response.data.checkin);

    console.log("Check-in generated successfully");
    console.log("Token usage:", response.usage);

    // Return successful response
    const result: CheckinResponse = {
      checkin,
      usage: response.usage,
    };

    return jsonResponse(result);
  } catch (error) {
    console.error("Error generating daily check-in:", error);

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
      "Failed to generate daily check-in",
      500,
      error.message
    );
  }
});
