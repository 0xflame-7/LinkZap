/**
 * @author Daksha  Jha
 * @copyright 2025 0xflame-7
 * @license Apache-2.0
 */

/**
 * Constants
 */
const CORS_WHITELIST = ['https://linkzap.render.com'];
const _1H_IN_MILLISECOND = 1000 * 60 * 60;
const _7DAYS_IN_MILLISECOND = 1000 * 60 * 60 * 24 * 7;

const config = {
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
  CORS_WHITELIST,
  LOGTAIL_SOURCE_TOKEN: process.env.LOGTAIL_SOURCE_TOKEN,
  LOGTAIL_INGESTING_HOST: process.env.LOGTAIL_INGESTING_HOST,
  WINDOW_MS: _1H_IN_MILLISECOND,
  MONGO_URL: process.env.MONGO_URL,
  WHITELISTED_EMAILS: process.env.WHITELISTED_EMAILS.split(','),
  CORS_MAX_AGE: _7DAYS_IN_MILLISECOND,
};

module.exports = config;
