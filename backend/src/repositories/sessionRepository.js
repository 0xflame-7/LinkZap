/**
 * @author Daksha  Jha
 * @copyright 2025 0xflame-7
 * @license Apache-2.0
 */

/**
 * Custom modules
 */
const Session = require('../model/Session');

const createSession = async (userId, user_agent, ip) => {
  const session = await Session.create({
    userId,
    user_agent,
    ip,
  });
  return session;
};

const setRefreshTokenSave = async (session, Token) => {
  session.refreshTokenHash = Token;
  await session.save();
};

module.exports = { createSession, setRefreshTokenSave };
