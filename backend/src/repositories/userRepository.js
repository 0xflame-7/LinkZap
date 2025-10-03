/**
 * @author Daksha  Jha
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

const getUserByEmail = async (email) => {
  return await User.findOne({ email }).select('+password');
};

const findUserByEmailPublic = async (email) => {
  return await User.findOne({ email });
};

const getUserWithoutPassword = async (userId) => {
  return await User.findById(userId);
};

module.exports = {
  createUser,
  getUserByEmail,
  findUserByEmailPublic,
  getUserWithoutPassword,
};
