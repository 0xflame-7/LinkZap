const urlService = require('../services/urlService');

async function shortenUrl(req, res, next) {
  try {
    const url = await urlService.shortenUrl({
      originalUrl: req.body.url,
      userId: req.userId,
      customAlias: req.body.customAlias,
    });
    res.status(201).json({
      success: true,
      url: url,
    });
  } catch (err) {
    next(err);
  }
}

async function getUrls(req, res, next) {
  try {
    const urls = await urlService.getUrls(req.userId);
    res.status(200).json({
      success: true,
      urls,
    });
  } catch (err) {
    next(err);
  }
}

module.exports = { shortenUrl, getUrls };
