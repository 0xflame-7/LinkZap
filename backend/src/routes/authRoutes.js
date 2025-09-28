/**
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
const authController = require('../controllers/authController');
const validationMiddleware = require('../middleware/validationMiddleware');
const { registerSchema } = require('../schema/authSchema');
const expressRateLimit = require('../lib/expressRateLimit');

// Initalize express router
const router = Router();

// Rate Limit
router.use(expressRateLimit('auth'));

router.post(
  '/register',
  validationMiddleware(registerSchema),
  authController.register,
);

module.exports = router;
