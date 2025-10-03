/**
 * @copyright 2025 0xflame-7
 * @license Apache-2.0
 */

/**
 * Custom modules
 */
const {
  findUserByEmailPublic,
  getUserWithoutPassword,
} = require('../repositories/userRepository');
const { NotFoundError } = require('../middleware/errorHandler');

async function getUser({ userId }) {
  const user = await getUserWithoutPassword(userId);
  if (!user) {
    throw new NotFoundError('User not found');
  }
  return user;
}

async function getUserByEmail({ email }) {
  const user = await findUserByEmailPublic(email);
  return user;
}

module.exports = {
  getUser,
  getUserByEmail,
};
