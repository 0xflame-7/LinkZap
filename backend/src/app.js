/**
 * @copyright 0xflame-7
 * @license Apache-2.0
 */

/**
 * Node modules
 */
const express = require('express');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const nanoid = require('nanoid');

/**
 * Custom modules
 */
const config = require('./config');

/**
 * Inital Express
 */
const app = express();

/**
 * Secure headers
 */
app.use(helmet());

/**
 * Parse JSON request bodies
 */
app.use(express.json());

/**
 * Parse URL encoded-bodies
 */
app.use(express.urlencoded({ extended: true }));

/**
 * Set the Public Folder
 */
// app.use(express.static(`${__dirname}/public`));

/**
 * Cookie parser
 */
app.use(cookieParser());

/**
 * Compress response
 */
app.use(compression());

// Start the app and listen on the configured PORT
app.listen(config.PORT, '0.0.0.0', () => {
  console.log(`Server listening at http://localhost:${config.PORT}`);
});
