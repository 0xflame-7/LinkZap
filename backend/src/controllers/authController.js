/**
 * @copyright 2025 0xflame-7
 * @license Apache-2.0
 */

/**
 * Custom modules
 */
const { getRefreshTokenPayload } = require('../lib/cookieParser');
const authService = require('../services/authService');

async function register(req, res, next) {
  try {
    const { user, accessToken } = await authService.register({
      ...req.body,
      ip: req.ip,
      user_agent: req.headers['user-agent'],
      res,
    });
    res.status(201).json({
      success: true,
      user: { _id: user._id, name: user.name, email: user.email },
      token: accessToken,
    });
  } catch (err) {
    next(err);
  }
}

async function login(req, res, next) {
  try {
    const { user, accessToken } = await authService.login({
      ...req.body,
      ip: req.ip,
      user_agent: req.headers['user-agent'],
      res,
    });
    res.status(200).json({
      success: true,
      user: { _id: user._id, name: user.name, email: user.email },
      token: accessToken,
    });
  } catch (err) {
    next(err);
  }
}

async function refresh(req, res, next) {
  try {
    const accessToken = await authService.refresh(req, res);
    res.status(200).json({ success: true, token: accessToken });
  } catch (error) {
    next(error);
  }
}

async function logout(req, res, next) {
  try {
    await authService.logout(req, res);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}

module.exports = { register, login, logout, refresh };
