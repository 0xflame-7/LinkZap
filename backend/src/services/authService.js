const { comparePassword, hashPassword } = require('../lib/bcrypt');
const { createUser } = require('../repositories/userRepository');

async function register({ name, email, password }) {
  const hashedPassword = await hashPassword(password);
  const user = await createUser({ name, email, password: hashedPassword });
  return user;
}

module.exports = { register };
