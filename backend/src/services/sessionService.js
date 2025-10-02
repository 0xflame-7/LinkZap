/**
 * @copyright 2025 0xflame-7
 * @license Apache-2.0
 */

/**
 * Custom modules
 */
const { generateAccessToken, generateRefreshToken } = require('../lib/jwt');
const {
  createSession,
  setRefreshTokenSave,
} = require('../repositories/sessionRepository');
const { setRefreshToken } = require('../lib/cookieParser');

async function createAuthSession({ userID, user_agent, ip, res }) {
  const session = await createSession(userID, user_agent, ip);

  const accessToken = generateAccessToken({ userID, sessionID: session._id });
  const refreshToken = generateRefreshToken({ userID, sessionID: session._id });

  await setRefreshTokenSave(session, refreshToken);
  setRefreshToken(res, refreshToken);
  return accessToken;
}

module.exports = { createAuthSession };
