/**
 * ApiResponse
 * Standard shape for every successful JSON response.
 * Controllers must use this — never call res.json() directly.
 */
class ApiResponse {
  /**
   * @param {number}  statusCode  - HTTP status code (200, 201, …)
   * @param {*}       data        - Payload to send to the client
   * @param {string}  message     - Human-readable success message
   */
  constructor(statusCode, data, message = "Success") {
    this.statusCode = statusCode;
    this.success    = statusCode < 400;
    this.message    = message;
    this.data       = data;
  }
}

export { ApiResponse };
