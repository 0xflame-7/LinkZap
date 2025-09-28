/**
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
  });
  next();
};

module.exports = requestHandler;
