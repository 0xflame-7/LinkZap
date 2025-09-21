/**
 * @copyright 0xflame-7
 * @license Apache-2.0
 */

/**
 * Node modules
 */
const { Router } = require('express');

/**
 * Initial Express router
 */
const router = Router();

router.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to URL Shortener API',
    version: '1.0.0',
    timestamp: Date.now(),
  });
});
