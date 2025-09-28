/**
 * @copyright 2025 0xflame-7
 * @license Apache-2.0
 */

/**
 * Custom modules
 */
const User = require('../model/User');

const createUser = async (userData) => {
  const user = new User(userData);
  return await user.save();
};

module.exports = { createUser };
