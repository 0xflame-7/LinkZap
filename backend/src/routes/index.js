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
 * Routes
 */
const authRoutes = require('./authRoutes');
const urlRoutes = require('./urlRoutes');
const userRoutes = require('./userRoutes');
const redirectRoute = require('./redirectRoute');

// Initalize express router
const router = Router();

router.get('/health', (req, res) => {
  res.status(200).json({
    message: 'Api is Live',
    health: 'Live',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
  });
});

router.use('/auth', authRoutes);
router.use('/url', urlRoutes);
router.use('/user', userRoutes);
router.use('/r', redirectRoute);

module.exports = router;
