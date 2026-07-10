/**
 * ApiError
 * Custom error class that carries an HTTP status code.
 * Throw this inside services/controllers; the global error
 * middleware catches it and formats the JSON response.
 */
class ApiError extends Error {
  /**
   * @param {number}   statusCode - HTTP status code (400, 404, 500 …)
   * @param {string}   message    - Developer / user-facing error message
   * @param {Array}    errors     - Optional array of validation error details
   */
  constructor(statusCode, message = "Something went wrong", errors = []) {
    super(message);

    this.statusCode = statusCode;
    this.success    = false;
    this.errors     = errors;

    // Maintain proper stack trace (V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export { ApiError };
