/**
 * @author Daksha  Jha
 * @copyright 2025 0xflame-7
 * @license Apache-2.0
 */

/**
 * Custom modules
 */
const { logger } = require('../lib/winston');

const requestHandler = (req, res, next) => {
  const start = Date.now();
  // When response finishes, log details
  res.on('finish', () => {
    const duration = Date.now() - start;
    logger.info(
      `${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms`,
    );
    logger.info({
      method: req.method,
      url: req.originalUrl,
      ip: req.ip,
      userAgent: req.headers['user-agent'],

      request: {
        cookies: req.cookies, // needs cookie-parser middleware
        query: req.query,
        body: req.body,
      },

      response: {
        statusCode: res.statusCode,
        statusMessage: res.statusMessage,
        body: responseBody, // careful: can be huge/sensitive
      },

      meta: {
        duration: `${duration}ms`,
        route: req.route ? req.route.path : 'N/A', // route path if matched
      },
    });
  });
  next();
};

module.exports = requestHandler;
