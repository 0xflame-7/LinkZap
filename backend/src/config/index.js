/**
 * @author Daksha  Jha
 * @copyright 2025
 * @license Apache-2.0
 */

/**
 * Custom modules
 */
const cookieConfig = require('./cookie');

/**
 * Constants
 */
const CORS_WHITELIST = ['https://linkzap.render.com', 'http://localhost:5173'];
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
  REFRESH_TOKEN_EXPIRES_IN: _7DAYS_IN_MILLISECOND,
  CLIENT_URL: process.env.CLIENT_URL,
  ACCESS_TOKEN_EXPIRES_IN: _1H_IN_MILLISECOND,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
};

module.exports = {
  ...config,
  ...cookieConfig(config.NODE_ENV, config.REFRESH_TOKEN_EXPIRES_IN),
};
