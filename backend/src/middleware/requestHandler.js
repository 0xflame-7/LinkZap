/**
 * @author Daksha  Jha
 * @copyright 2025 0xflame-7
 * @license Apache-2.0
 */

const { logger } = require('../lib/winston');

const requestHandler = (req, res, next) => {
  const start = Date.now();

  // Capture response body by overriding res.send
  const oldSend = res.send;
  let responseBody;
  res.send = function (body) {
    responseBody = body;
    return oldSend.apply(res, arguments);
  };

  res.on('finish', () => {
    const duration = Date.now() - start;

    logger.info(
      `${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms`,
    );

    logger.info({
      method: req.method,
      url: req.originalUrl,
      ip: req.ip,
      userAgent: req.headers['user-agent'],
      headers: req.headers,

      request: {
        cookies: {
          refreshToken: req.cookies.refreshToken || null,
        },
        query: req.query,
        body: req.body,
      },

      response: {
        statusCode: res.statusCode,
        statusMessage: res.statusMessage,
        body:
          typeof responseBody === 'string'
            ? responseBody
            : JSON.stringify(responseBody), // safe stringify
      },

      meta: {
        duration: `${duration}ms`,
        route: req.route ? req.route.path : 'N/A',
      },
    });
  });

  next();
};

module.exports = requestHandler;
