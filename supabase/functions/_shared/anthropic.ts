/**
 * Anthropic Claude API Client Wrapper
 *
 * This module provides a reusable wrapper around the Anthropic API
 * for use in Supabase Edge Functions (Deno runtime).
 */

import Anthropic from "npm:@anthropic-ai/sdk@0.30.1";

const MODEL = "claude-sonnet-4-5-20250929";
const MAX_TOKENS = 4096;

export interface AnthropicConfig {
  apiKey: string;
  maxTokens?: number;
  temperature?: number;
}

export interface MessageRequest {
  systemPrompt: string;
  userPrompt: string;
  temperature?: number;
  maxTokens?: number;
}

export interface MessageResponse {
  content: string;
  usage: {
    inputTokens: number;
    outputTokens: number;
  };
}

/**
 * Create an Anthropic client instance
 */
export function createAnthropicClient(config: AnthropicConfig): Anthropic {
  return new Anthropic({
    apiKey: config.apiKey,
  });
}

/**
 * Send a message to Claude and get a response
 *
 * @param client - Anthropic client instance
 * @param request - Message request configuration
 * @returns Promise with the AI response
 * @throws Error if API call fails
 */
export async function sendMessage(
  client: Anthropic,
  request: MessageRequest
): Promise<MessageResponse> {
  try {
    const message = await client.messages.create({
      model: MODEL,
      max_tokens: request.maxTokens || MAX_TOKENS,
      temperature: request.temperature ?? 0.7,
      system: request.systemPrompt,
      messages: [
        {
          role: "user",
          content: request.userPrompt,
        },
      ],
    });

    // Extract text content from the response
    const content = message.content[0];
    if (content.type !== "text") {
      throw new Error("Unexpected response type from Claude API");
    }

    return {
      content: content.text,
      usage: {
        inputTokens: message.usage.input_tokens,
        outputTokens: message.usage.output_tokens,
      },
    };
  } catch (error) {
    console.error("Anthropic API error:", error);
    throw new Error(`Failed to get response from Claude: ${error.message}`);
  }
}

/**
 * Send a message to Claude and parse JSON response
 *
 * @param client - Anthropic client instance
 * @param request - Message request configuration
 * @returns Promise with parsed JSON response
 * @throws Error if API call fails or response is not valid JSON
 */
export async function sendMessageWithJSON<T>(
  client: Anthropic,
  request: MessageRequest
): Promise<{ data: T; usage: MessageResponse["usage"] }> {
  // Append JSON instruction to user prompt
  const enhancedPrompt = `${request.userPrompt}\n\nRespond ONLY with valid JSON. No markdown, no explanation, just JSON.`;

  const response = await sendMessage(client, {
    ...request,
    userPrompt: enhancedPrompt,
  });

  try {
    // Try to parse the JSON response
    const data = JSON.parse(response.content) as T;
    return {
      data,
      usage: response.usage,
    };
  } catch (error) {
    // If parsing fails, retry with stricter instructions
    console.warn("Initial JSON parse failed, retrying with stricter prompt");

    const retryPrompt = `${request.userPrompt}\n\nPREVIOUS OUTPUT WAS INVALID JSON. Ensure your response is ONLY valid JSON, no other text. Start with { and end with }.`;

    const retryResponse = await sendMessage(client, {
      ...request,
      userPrompt: retryPrompt,
    });

    try {
      const data = JSON.parse(retryResponse.content) as T;
      return {
        data,
        usage: retryResponse.usage,
      };
    } catch (retryError) {
      console.error("Failed to parse JSON after retry:", retryResponse.content);
      throw new Error(`Invalid JSON response from Claude: ${retryError.message}`);
    }
  }
}

/**
 * Retry function with exponential backoff
 *
 * @param fn - Function to retry
 * @param maxRetries - Maximum number of retries
 * @param baseDelay - Base delay in milliseconds
 * @returns Promise with function result
 */
export async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  maxRetries = 3,
  baseDelay = 1000
): Promise<T> {
  let lastError: Error;

  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;

      // Don't retry on certain errors
      if (error.status === 400 || error.status === 401 || error.status === 403) {
        throw error;
      }

      // If this was the last retry, throw the error
      if (i === maxRetries - 1) {
        break;
      }

      // Wait with exponential backoff
      const delay = baseDelay * Math.pow(2, i);
      console.log(`Retry ${i + 1}/${maxRetries} after ${delay}ms`);
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }

  throw lastError!;
}

/**
 * Get the Anthropic API key from environment
 *
 * @returns API key
 * @throws Error if API key is not set
 */
export function getAnthropicApiKey(): string {
  const apiKey = Deno.env.get("ANTHROPIC_API_KEY");
  if (!apiKey) {
    throw new Error("ANTHROPIC_API_KEY environment variable is not set");
  }
  return apiKey;
}
