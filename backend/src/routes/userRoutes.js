/**
 * @author Daksha  Jha
 * @copyright 2025 0xflame-7
 * @license Apache-2.0
 */

/**
 * Node modules
 */
const { Router } = require('express');

/**
 * Custom modules
 */
const userController = require('../controllers/userController');
const expressRateLimit = require('../lib/expressRateLimit');
const authenticationHandler = require('../middleware/authenticationHandler');

// Initalize express router
const router = Router();

// Rate Limit
router.use(expressRateLimit('basic'));

router.get('/me', authenticationHandler, userController.getMe);

module.exports = router;
