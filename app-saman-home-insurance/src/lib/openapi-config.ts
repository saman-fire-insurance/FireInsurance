/**
 * OpenAPI configuration initializer
 * This module should be imported early to ensure the correct base URL is set
 * before any API calls are made.
 */

import { OpenAPI } from '@/swagger/core/OpenAPI';

// Initialize OpenAPI configuration with environment variables
function initializeOpenAPI() {
  // Set base URL from environment variable, fallback to current base if not set
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  
  if (baseUrl) {
    OpenAPI.BASE = baseUrl;
    console.log('🔧 [OpenAPI] Base URL set to:', baseUrl);
  } else {
    console.warn('⚠️ [OpenAPI] NEXT_PUBLIC_API_URL not found, using default:', OpenAPI.BASE);
  }
}

// Initialize immediately when this module is imported
initializeOpenAPI();

export { initializeOpenAPI };