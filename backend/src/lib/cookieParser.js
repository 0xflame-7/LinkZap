/**
 * @copyright 2025 0xflame-7
 * @license Apache-2.0
 */

/**
 * Custom Modules
 */
const config = require('../config');
const { verifyRefreshToken } = require('./jwt');

const setRefreshToken = (res, token) => {
  res.cookie(config.REFRESH_COOKIE_NAME, token, config.COOKIE_OPTIONS);
};

const clearRefreshToken = (res) => {
  res.clearCookie(config.REFRESH_COOKIE_NAME, config.COOKIE_OPTIONS);
};

const getRefreshToken = (req) => req.cookies[config.REFRESH_COOKIE_NAME];

const getRefreshTokenPayload = (req) => {
  const token = getRefreshToken(req);
  return token ? verifyRefreshToken(token) : null;
};

module.exports = {
  setRefreshToken,
  clearRefreshToken,
  getRefreshToken,
  getRefreshTokenPayload,
};
