/**
 * CORS Headers and Utilities
 *
 * Provides consistent CORS configuration for all Edge Functions
 */

/**
 * Standard CORS headers for Edge Functions
 */
export const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, GET, OPTIONS, PUT, DELETE",
};

/**
 * Create a JSON response with CORS headers
 *
 * @param data - Response data
 * @param status - HTTP status code (default: 200)
 * @returns Response object with CORS headers
 */
export function jsonResponse(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      ...corsHeaders,
      "Content-Type": "application/json",
    },
  });
}

/**
 * Create an error response with CORS headers
 *
 * @param message - Error message
 * @param status - HTTP status code (default: 500)
 * @param details - Optional error details
 * @returns Response object with error and CORS headers
 */
export function errorResponse(
  message: string,
  status = 500,
  details?: unknown
): Response {
  return new Response(
    JSON.stringify({
      error: message,
      details,
      timestamp: new Date().toISOString(),
    }),
    {
      status,
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
      },
    }
  );
}

/**
 * Handle OPTIONS preflight requests
 *
 * @returns Response for OPTIONS request
 */
export function handleOptions(): Response {
  return new Response(null, {
    status: 204,
    headers: corsHeaders,
  });
}

/**
 * Validate HTTP method
 *
 * @param request - Request object
 * @param allowedMethods - Array of allowed HTTP methods
 * @returns True if method is allowed, false otherwise
 */
export function isMethodAllowed(
  request: Request,
  allowedMethods: string[]
): boolean {
  return allowedMethods.includes(request.method);
}
