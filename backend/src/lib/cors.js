/**
 * @author Daksha  Jha
 * @copyright 2025 0xflame-7
 * @license Apache-2.0
 */

/**
 * Custom modules
 */
const config = require('../config');

// CORS configuration options
const corsOptions = {
  origin: (requestOrigin, callback) => {
    if (requestOrigin && config.CORS_WHITELIST.includes(requestOrigin)) {
      callback(null, true);
    } else {
      callback(
        config.NODE_ENV === 'development'
          ? null
          : new Error('Not allowed by CORS'),
      );
    }
  },
};

module.exports = corsOptions;
