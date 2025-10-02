const urlsService = require('../services/urlsService');

async function shortenUrl(req, res, next) {
  try {
    const url = urlsService.shortenUrl(req.body);
    res.status(201).json({
      success: true,
      url: url,
    });
  } catch (err) {
    next(err);
  }
}

module.exports = { shortenUrl };
