/**
 * @copyright 2025 0xflame-7
 * @license Apache-2.0
 */

/**
 * Custom modules
 */
const userService = require('../services/userService');

async function getMe(req, res, next) {
  try {
    const user = await userService.getUser(req);
    res.status(200).json({
      success: true,
      data: {
        user: { _id: user._id, name: user.name, email: user.email },
      },
    });
  } catch (error) {
    next(error);
  }
}
