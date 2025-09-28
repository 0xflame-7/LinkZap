/**
 * @author Daksha Jha
 * @copyright 2025 0xflame-7
 * @license Apache-2.0
 */

/**
 * Custom modules
 */
const app = require('./app');
const config = require('./config');
const { connectToDB, disconnectFromDB } = require('./lib/moongose');
const { logger, logtail } = require('./lib/winston');

(async () => {
  let server;

  const cleanup = async (exitCode = 0) => {
    try {
      await disconnectFromDB();

      if (server) {
        await new Promise((res, rej) =>
          server.close((err) => (err ? rej(err) : res())),
        );
      }

      if (logtail) {
        await logtail.flush();
      }

      process.exit(exitCode);
    } catch (err) {
      logger.error('Cleanup failed', err);
      process.exit(1);
    }
  };

  try {
    await connectToDB();

    server = app.listen(config.PORT, '0.0.0.0', () => {
      logger.info(`Server listening at http://localhost:${config.PORT}`);
    });

    process.on('SIGINT', () => {
      logger.info('Received SIGINT. Shutting down...');
      cleanup(0);
    });

    process.on('SIGTERM', () => {
      logger.info('Received SIGTERM. Shutting down...');
      cleanup(0);
    });

    process.on('uncaughtException', async (err) => {
      logger.error(`Uncaught Exception: ${err.message}\n${err.stack}`);
      await cleanup(1);
    });

    process.on('unhandledRejection', async (reason) => {
      logger.error(
        `Unhandled Rejection: ${
          reason instanceof Error ? reason.stack : JSON.stringify(reason)
        }`,
      );
      await cleanup(1);
    });
  } catch (err) {
    logger.error('Server startup failed', err);
    await cleanup(1);
  }
})();
