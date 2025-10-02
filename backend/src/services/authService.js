/**
 * @author Daksha  Jha
 * @copyright 2025 0xflame-7
 * @license Apache-2.0
 */

const { comparePassword, hashPassword } = require('../lib/bcrypt');
const {
  ConflictError,
  UnauthorizedError,
} = require('../middleware/errorHandler');
const {
  createUser,
  getUserByEmail,
  findUserByEmailPublic,
} = require('../repositories/userRepository');

async function register({ name, email, password }) {
  const existingUser = await findUserByEmailPublic(email);
  if (existingUser) {
    throw new ConflictError('User already exists');
  }

  const hashedPassword = await hashPassword(password);
  const user = await createUser({ name, email, password: hashedPassword });
  return user;
}

async function login({ email, password }) {
  const user = await getUserByEmail(email);
  if (!user) {
    throw new UnauthorizedError('Invalid credentials');
  }

  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) throw new UnauthorizedError('Invalid credentials');

  return user;
}

module.exports = { register, login };
