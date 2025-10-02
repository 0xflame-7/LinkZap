/**
 * @author Daksha  Jha
 * @copyright 2025 0xflame-7
 * @license Apache-2.0
 */

/**
 * Node modules
 */
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const compression = require('compression');

/**
 * Custom modules
 */
const routes = require('./routes');
const corsOptions = require('./lib/cors');
const requestHandler = require('./middleware/requestHandler');
const { errorHandler } = require('./middleware/errorHandler');

// Initialize express
const app = express();

// Global middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compression());
app.use(helmet());

// Request handler
app.use(requestHandler);

// Routes
app.use('/', routes);

// Error handler
app.use(errorHandler);

module.exports = app;
