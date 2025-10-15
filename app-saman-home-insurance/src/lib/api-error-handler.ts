/**
 * Comprehensive API error handler utility
 * Handles various error structures including arrays, Ardalis Result patterns, and different API response formats
 */

// Helper function to safely get error message from various structures
const extractErrorMessage = (obj: any): string | null => {
  if (!obj) return null;
  
  // Check if obj is an array, process each item
  if (Array.isArray(obj)) {
    const errorMessages: string[] = [];
    
    for (const item of obj) {
      if (item && typeof item === 'object') {
        // Check for errorMessage property (our target)
        if (typeof item.errorMessage === 'string' && item.errorMessage.trim()) {
          errorMessages.push(item.errorMessage);
        }
        // Check for other properties if errorMessage is not found
        else if (typeof item.detail === 'string' && item.detail.trim()) {
          errorMessages.push(item.detail);
        }
        else if (typeof item.message === 'string' && item.message.trim()) {
          errorMessages.push(item.message);
        }
      }
    }
    
    if (errorMessages.length > 0) {
      return errorMessages.join('\n');
    }
  }
  
  // Normalize common casing differences (FastEndpoints often uses capital keys)
  const errorsKey = (obj.errors ?? obj.Errors) as any;
  const messageKey = obj.message ?? obj.Message;
  const detailKey = obj.detail ?? obj.Detail;
  const titleKey = obj.title ?? obj.Title;
  const statusKey = obj.status ?? obj.Status ?? obj.statusCode ?? obj.StatusCode;

  // Check for Ardalis/FastEndpoints Result pattern - errors array (objects or strings)
  if (errorsKey && Array.isArray(errorsKey)) {
    const errorMessages: string[] = [];
    
    for (const error of errorsKey) {
      if (error && typeof error === 'object') {
        // Check for errorMessage property (our target)
        if (typeof error.errorMessage === 'string' && error.errorMessage.trim()) {
          errorMessages.push(error.errorMessage);
        }
        // Check for other properties if errorMessage is not found
        else if (typeof error.detail === 'string' && error.detail.trim()) {
          errorMessages.push(error.detail);
        }
        else if (typeof error.message === 'string' && error.message.trim()) {
          errorMessages.push(error.message);
        }
        // Check for value property (common in Ardalis Result)
        else if (typeof error.value === 'string' && error.value.trim()) {
          errorMessages.push(error.value);
        }
        // Check for code/description tuple (common in FastEndpoints validation)
        else if (typeof (error.description ?? error.Description) === 'string') {
          errorMessages.push(String(error.description ?? error.Description));
        }
      } else if (typeof error === 'string' && error.trim()) {
        // Ardalis sometimes returns array of strings
        errorMessages.push(error);
      }
    }
    
    if (errorMessages.length > 0) {
      return errorMessages.join('\n');
    }
  }
  
  // Check for Ardalis Result pattern - isSuccess = false with single error
  if (obj.isSuccess === false) {
    // Check for single error object
    if (obj.error && typeof obj.error === 'object') {
      const errorMsg = extractErrorMessage(obj.error);
      if (errorMsg) return errorMsg;
    }
    
    // Check for error message directly
    if (typeof obj.errorMessage === 'string' && obj.errorMessage.trim()) {
      return obj.errorMessage;
    }
    
    // Check for value property (common in failed Ardalis Results)
    if (typeof obj.value === 'string' && obj.value.trim()) {
      return obj.value;
    }
  }
  
  // Check for errorMessage property (our target)
  if (typeof obj.errorMessage === 'string' && obj.errorMessage.trim()) {
    return obj.errorMessage;
  }
  
  // Check for validation errors object (lower/upper-case keys)
  if (errorsKey && typeof errorsKey === 'object' && !Array.isArray(errorsKey)) {
    const validationErrors = Object.values(errorsKey).flat().join("\n");
    if (validationErrors.trim()) {
      return `خطاهای اعتبارسنجی:\n${validationErrors}`;
    }
  }
  
  // ProblemDetails style
  if (typeof detailKey === 'string' && detailKey.trim()) {
    return detailKey;
  }
  
  // Message style
  if (typeof messageKey === 'string' && messageKey.trim()) {
    return messageKey;
  }

  // Combine title + status
  if (titleKey && statusKey) {
    return `${titleKey} (${statusKey})`;
  }
  
  return null;
};

/**
 * Main API error handler function
 * @param error - The error object from API calls
 * @param defaultMessage - Default message to show if no specific error is found
 * @returns Formatted error message string with preserved status codes
 */
export const handleApiError = (error: any, defaultMessage: string = "خطایی رخ داد. لطفا دوباره تلاش کنید."): string => {
  console.log("Handling API error:", error);
  
  // Preserve specific error codes like 429 (Too Many Requests)
  if (error?.status === 429) {
    return "درخواست‌های زیادی ارسال شده است. لطفا کمی صبر کنید و دوباره تلاش کنید.";
  }
  
  // 1. Check ApiError body (swagger-generated errors)
  if (error?.body) {
    const message = extractErrorMessage(error.body);
    if (message) {
      console.log("Found error in error.body:", message);
      return message;
    }
  }
  
  // 2. Check if error itself has the properties
  const directMessage = extractErrorMessage(error);
  if (directMessage) {
    console.log("Found error in error object:", directMessage);
    return directMessage;
  }
  
  // 3. Check response.body structure
  if (error?.response?.body) {
    const message = extractErrorMessage(error.response.body);
    if (message) {
      console.log("Found error in error.response.body:", message);
      return message;
    }
  }
  
  // 4. Check if body is a string and try to parse it
  if (typeof error?.body === 'string') {
    try {
      const parsed = JSON.parse(error.body);
      const message = extractErrorMessage(parsed);
      if (message) {
        console.log("Found error in parsed body:", message);
        return message;
      }
    } catch (e) {
      console.log("Failed to parse error body as JSON");
    }
  }
  
  // 5. Check if response.body is a string and try to parse it
  if (typeof error?.response?.body === 'string') {
    try {
      const parsed = JSON.parse(error.response.body);
      const message = extractErrorMessage(parsed);
      if (message) {
        console.log("Found error in parsed response.body:", message);
        return message;
      }
    } catch (e) {
      console.log("Failed to parse response.body as JSON");
    }
  }
  
  // 6. Fallback to error.message if it's not generic
  if (error?.message && 
      error.message !== 'Bad Request' && 
      error.message !== 'Network Error' &&
      error.message !== 'Unauthorized' &&
      error.message !== 'Forbidden' &&
      error.message.trim()) {
    console.log("Using error.message as fallback:", error.message);
    return error.message;
  }
  
  // 7. Last resort - return default message
  console.log("No meaningful error message found, using default");
  return defaultMessage;
};

/**
 * Clean error message by removing common prefixes
 * @param errorMessage - Raw error message
 * @returns Cleaned error message
 */
export const cleanErrorMessage = (errorMessage: string): string => {
  return errorMessage
    .replace("Next error(s) occurred:*", "")
    .replace("Next error(s) occurred:", "")
    .trim();
};

/**
 * Handle API error with automatic cleaning
 * @param error - The error object from API calls
 * @param defaultMessage - Default message to show if no specific error is found
 * @returns Cleaned and formatted error message string
 */
export const handleApiErrorWithCleanup = (error: any, defaultMessage: string = "خطایی رخ داد. لطفا دوباره تلاش کنید."): string => {
  const message = handleApiError(error, defaultMessage);
  return cleanErrorMessage(message);
};

/**
 * Handle API error and return detailed error information including status codes
 * @param error - The error object from API calls
 * @param defaultMessage - Default message to show if no specific error is found
 * @returns Object containing message, status code, and other error details
 */
export const handleApiErrorWithDetails = (error: any, defaultMessage: string = "خطایی رخ داد. لطفا دوباره تلاش کنید.") => {
  const message = handleApiErrorWithCleanup(error, defaultMessage);
  
  return {
    message,
    status: error?.status || error?.response?.status || null,
    code: error?.code || error?.response?.code || null,
    type: error?.body?.type || error?.response?.body?.type || null,
    title: error?.body?.title || error?.response?.body?.title || null,
    detail: error?.body?.detail || error?.response?.body?.detail || null,
    body: error?.body || error?.response?.body || null,
  };
};
