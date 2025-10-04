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
const urlController = require('../controllers/urlController');
const validationHandler = require('../middleware/validationHandler');
const expressRateLimit = require('../lib/expressRateLimit');
const urlSchema = require('../schema/urlsSchema');

// Initalize express router
const router = Router();

// Rate Limit
router.use(expressRateLimit('basic'));

router.post('/shorten', validationHandler(urlSchema), urlController.shortenUrl);

module.exports = router;
