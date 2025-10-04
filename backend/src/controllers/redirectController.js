const urlService = require('../services/urlService');

async function redirect(req, res, next) {
  try {
    const url = await urlService.getUrlByShortCode(req.params.shortCode);
    res.redirect(url.originalUrl);
  } catch (err) {
    next(err);
  }
}

module.exports = { redirect };
