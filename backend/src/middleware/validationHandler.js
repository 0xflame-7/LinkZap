/**
 * @copyright 0xflame-7
 * @license Apache-2.0
 */

/**
 * Node modules
 */
const { ZodError } = require('zod');

const validationHandler =
  (schema, property = 'body') =>
  (req, res, next) => {
    try {
      req[property] = schema.parse(req[property]);
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        // Keep only the first error per field
        const seen = new Set();
        const errors = [];

        for (const issue of err.issues) {
          const path = issue.path.join('.');
          if (!seen.has(path)) {
            seen.add(path);
            errors.push({
              path,
              message: issue.message,
            });
          }
        }

        return res.status(400).json({
          code: 'ValidationError',
          errors,
        });
      }

      next(err);
    }
  };

module.exports = validationHandler;
