const { UnauthorizedError } = require('./errorHandler');
const { verifyAccessToken } = require('../lib/jwt');

const authenticationHandler = (req, res, next) => {
  try {
    const authorization = req.headers.authorization;
    if (!authorization || !authorization.startsWith('Bearer ')) {
      throw new UnauthorizedError('No token provided');
    }

    const [_, token] = authorization.split(' ');
    const { userId } = verifyAccessToken(token);

    if (!userId) throw new UnauthorizedError('Invalid token');

    req.userId = userId;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authenticationHandler;
