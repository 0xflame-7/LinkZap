/**
 * @copyright 0xflame-7
 * @license Apache-2.0
 */

/**
 * Node modules
 */
const { createLogger, format, transports } = require('winston');
const { Logtail } = require('@logtail/node');
const { LogtailTransport } = require('@logtail/winston');

/**
 * Custom modules
 */
const config = require('../config');

// Winston transports array
const transportation = [];

/**
 * Destructure format utilities
 */
const { colorize, printf, combine, timestamp, label } = format;

/**
 * Configure Logtail transport for production
 */
let logtail = null;
if (
  config.NODE_ENV === 'production' &&
  config.LOGTAIL_SOURCE_TOKEN &&
  config.LOGTAIL_INGESTING_HOST
) {
  logtail = new Logtail(config.LOGTAIL_SOURCE_TOKEN, {
    endpoint: config.LOGTAIL_INGESTING_HOST,
  });

  transportation.push(new LogtailTransport({ logtail }));
} else {
  if (config.NODE_ENV === 'production') {
    console.warn(
      '⚠️ Missing Logtail configuration. Falling back to console logging only.',
    );
  }

  // Console transport (always available in dev, fallback in prod)
  transportation.push(
    new transports.Console({
      format: combine(
        colorize({ all: true }),
        label(),
        timestamp({ format: 'DD-MM-YYYY HH:mm:ssA' }),
        printf(({ level, message, timestamp }) => {
          return `${timestamp} [${level}]: ${message}`;
        }),
      ),
    }),
  );
}

/**
 * Create Winston logger
 */
const logger = createLogger({
  transports: transportation,
});

module.exports = { logger, logtail };
