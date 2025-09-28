/**
 * @copyright 0xflame-7
 * @license Apache-2.0
 */

/**
 * Node modules
 */
const rateLimit = require('express-rate-limit');

/**
 * Custom modules
 */
const config = require('../config');

// Default rate Limit configuration applied for all types
const defaultLimitOpt = {
  windowMs: config.WINDOW_MS, // 1 hour window
  standardHeaders: true,
  legacyHeaders: false,
};

// Map holding specific rate limit options on type
const rateLimitOpt = new Map([
  ['basic', { ...defaultLimitOpt, max: 100 }],
  ['auth', { ...defaultLimitOpt, max: 10 }],
  ['passReset', { ...defaultLimitOpt, max: 3 }],
]);

// Function to get rate limit middleware based on type
const expressRateLimit = (type) => {
  const opts = rateLimitOpt.get(type);

  if (!opts) {
    throw new Error(`No rate limit config found for type: ${type}`);
  }

  return rateLimit(opts); // return actual middleware function
};

module.exports = expressRateLimit;
