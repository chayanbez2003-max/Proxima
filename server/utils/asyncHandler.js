/**
 * asyncHandler
 * Wraps an async Express route handler so that any rejected promise
 * is forwarded to Express's next(err) — no try/catch boilerplate needed
 * inside controllers.
 *
 * Usage:
 *   router.post("/route", asyncHandler(myController));
 *
 * @param {Function} fn - Async Express request handler
 * @returns {Function}  Express middleware
 */
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

export { asyncHandler };
