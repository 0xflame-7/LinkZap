/**
 * @author Daksha  Jha
 * @copyright 2025 0xflame-7
 * @license Apache-2.0
 */

/**
 * Node modules
 */
const jwt = require('jsonwebtoken');

/**
 * Custom modules
 */
const config = require('../config');
const { UnauthorizedError } = require('../middleware/errorHandler');

const generateAccessToken = (payload) => {
  return jwt.sign(payload, config.JWT_SECRET, {
    expiresIn: config.ACCESS_TOKEN_EXPIRES_IN,
  });
};

const generateRefreshToken = (payload) => {
  return jwt.sign(payload, config.JWT_REFRESH_SECRET, {
    expiresIn: config.REFRESH_TOKEN_EXPIRES_IN,
  });
};

const verifyAccessToken = (token) => {
  try {
    return jwt.verify(token, config.JWT_SECRET);
  } catch (err) {
    throw new UnauthorizedError('Invalid token');
  }
};

const verifyRefreshToken = (token) => {
  try {
    return jwt.verify(token, config.JWT_REFRESH_SECRET);
  } catch (err) {
    throw new UnauthorizedError('Invalid token');
  }
};

const decodeToken = (token) => {
  try {
    return jwt.decode(token);
  } catch (err) {
    throw new UnauthorizedError('Invalid token');
  }
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
  decodeToken,
};
