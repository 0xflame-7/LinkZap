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
const redirectController = require('../controllers/redirectController');

// Initalize express router
const router = Router();

router.get('/:shortCode', redirectController.redirect);

module.exports = router;
