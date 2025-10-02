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
const {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} = require('../lib/jwt');
const {
  getRefreshTokenPayload,
  clearRefreshToken,
  setRefreshToken,
} = require('../lib/cookieParser');
const {
  createSession,
  setRefreshTokenSave,
  invalidateSession,
  getSession,
} = require('../repositories/sessionRepository');
const {
  hashPassword: hashToken,
  comparePassword: compareToken,
} = require('../lib/bcrypt');

/**
 * Create a new auth session (with token rotation + secure storage)
 */
async function createAuthSession({ userId, user_agent, ip, res }) {
  const session = await createSession(userId, user_agent, ip);

  const accessToken = generateAccessToken({ userId, sessionID: session._id });
  const refreshToken = generateRefreshToken({ userId, sessionID: session._id });

  // Hash before saving
  const hashedRefresh = await hashToken(refreshToken);
  await setRefreshTokenSave(session, hashedRefresh);

  // Set cookie
  setRefreshToken(res, refreshToken);

  return accessToken;
}

/**
 * Register new user
 */
async function register({ name, email, password, user_agent, ip, res }) {
  const existingUser = await findUserByEmailPublic(email);
  if (existingUser) throw new ConflictError('User already exists');

  const hashedPassword = await hashPassword(password);
  const user = await createUser({ name, email, password: hashedPassword });

  const accessToken = await createAuthSession({
    userId: user._id,
    user_agent,
    ip,
    res,
  });

  return { user, accessToken };
}

/**
 * Login user
 */
async function login({ email, password, user_agent, ip, res }) {
  const user = await getUserByEmail(email);
  if (!user) throw new UnauthorizedError('Invalid credentials');

  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) throw new UnauthorizedError('Invalid credentials');

  const accessToken = await createAuthSession({
    userId: user._id,
    user_agent,
    ip,
    res,
  });

  return { user, accessToken };
}

/**
 * Logout user (invalidate session + clear cookie)
 */
async function logout(req, res) {
  const payload = getRefreshTokenPayload(req);
  if (!payload) throw new UnauthorizedError('Invalid refresh token');

  const { sessionID } = payload;

  await invalidateSession(sessionID);
  clearRefreshToken(res);
}

/**
 * Refresh tokens (with rotation)
 */
async function refresh(req, res) {
  const payload = getRefreshTokenPayload(req);
  if (!payload) throw new UnauthorizedError('Invalid refresh token');

  const { sessionID, userId } = payload;

  // Validate session
  const session = await getSession(sessionID);
  if (!session) throw new UnauthorizedError('Invalid session');

  // Compare cookie token with DB hash
  const cookieToken = req.cookies?.refreshToken;
  if (!cookieToken) throw new UnauthorizedError('Missing refresh token');

  const isValid = await compareToken(cookieToken, session.refreshTokenHash);
  if (!isValid) throw new UnauthorizedError('Invalid refresh token');

  // Generate new access + refresh tokens (rotation)
  const accessToken = generateAccessToken({ userId, sessionID });
  const newRefreshToken = generateRefreshToken({ userId, sessionID });

  // Save new refresh token hash
  const newHash = await hashToken(newRefreshToken);
  await setRefreshTokenSave(session, newHash);

  // Update cookie
  setRefreshToken(res, newRefreshToken);

  return accessToken;
}

module.exports = { register, login, logout, refresh };
