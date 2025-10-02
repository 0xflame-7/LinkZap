/**
 * @copyright 2025 0xflame-7
 * @license Apache-2.0
 */

/**
 * Custom modules
 */
const authService = require('../services/authService');

async function register(req, res, next) {
  try {
    const user = await authService.register(req.body);
    res.status(201).json({
      success: true,
      user: { _id: user._id, name: user.name, email: user.email },
    });
  } catch (err) {
    next(err);
  }
}

async function login(req, res, next) {
  try {
    const user = await authService.login(req.body);
    res.status(200).json({
      success: true,
      user: { _id: user._id, name: user.name, email: user.email },
    });
  } catch (err) {
    next(err);
  }
}

module.exports = { register, login };
