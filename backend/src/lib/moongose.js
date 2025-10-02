/**
 * @author Daksha  Jha
 * @copyright 2025 0xflame-7
 * @license Apache-2.0
 */

/**
 * Node modules
 */
const { connect, disconnect } = require('mongoose');

/**
 * Custom modules
 */
const config = require('../config');
const { logger } = require('../lib/winston');

/**
 * Mongoose Connection Options
 */
const connectionOptions = {
  serverApi: {
    version: '1',
    strict: true,
    deprecationErrors: true,
  },
  dbName: 'Links',
};

const connectToDB = async () => {
  if (!config.MONGO_URL) {
    throw new Error('Mongo Url is missing');
  }

  try {
    await connect(config.MONGO_URL, connectionOptions);
    logger.info('Database connected successfully');
  } catch (error) {
    logger.error(`Failed to connect database ${error}`);
  }
};

// Discconnect from MongoDB
const disconnectFromDB = async () => {
  try {
    await disconnect();
    logger.info('Database disconnected successfully');
  } catch (error) {
    logger.error(`Failed to disconnect database ${error}`);
  }
};

module.exports = { connectToDB, disconnectFromDB };
