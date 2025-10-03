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
const authController = require('../controllers/authController');
const validationHandler = require('../middleware/validationHandler');
const { registerSchema, loginSchema } = require('../schema/authSchema');
const expressRateLimit = require('../lib/expressRateLimit');
const authenticationHandler = require('../middleware/authenticationHandler');

// Initalize express router
const router = Router();

// Rate Limit
// router.use(expressRateLimit('auth')); // 10 requests per hour

router.post(
  '/register',
  validationHandler(registerSchema),
  authController.register,
);

router.post('/login', validationHandler(loginSchema), authController.login);
router.post('/logout', authenticationHandler, authController.logout);
router.post('/refresh', authController.refresh);

module.exports = router;
