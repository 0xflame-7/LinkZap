/**
 * Check if access token is more than half expired
 * token: JWT string
 */
const { decodeToken } = require('../lib/jwt');

module.exports = async function isTokenHalfExpired(token) {
  if (!token) return true; // no token = expired

  try {
    const decoded = decodeToken(token);
    const exp = decoded.exp * 1000; // expiry time in milliseconds
    const iat = decoded.iat * 1000; // issued at in milliseconds
    const now = Date.now();

    const lifetime = exp - iat; // total token lifetime in milliseconds
    const elapsed = now - iat; // milliseconds since issued

    // If more than half of token lifetime has elapsed
    return elapsed >= lifetime / 2;
  } catch (err) {
    console.error('Invalid JWT:', err);
    return true; // treat invalid token as expired
  }
};
