/**
 * @author Daksha  Jha
 * @copyright 2025 0xflame-7
 * @license Apache-2.0
 */

const config = require('../config');
const generateId = require('../lib/nanoid');
const {
  getUrlsInCreatedAtOrder,
  findAndHit,
  createUrl,
} = require('../repositories/urlRepository');

async function shortenUrl({ originalUrl, userId, customAlias }) {
  const shortCode = customAlias || generateId();

  const url = await createUrl({
    originalUrl,
    shortCode,
    userId,
    customAlias: !!customAlias,
  });

  return {
    id: url._id,
    shortUrl: `${config.CLIENT_URL}/r/${shortCode}`,
    shortCode: url.shortCode,
    originalUrl: url.originalUrl,
    createdAt: url.createdAt,
    clicks: url.clicks,
  };
}

async function getUrls(userId) {
  const urls = await getUrlsInCreatedAtOrder(userId);
  return urls.map((url) => ({
    id: url._id,
    originalUrl: url.originalUrl,
    shortCode: url.shortCode,
    createdAt: url.createdAt,
    clicks: url.clicks,
  }));
}

async function getUrlByShortCode(shortCode) {
  return await findAndHit(shortCode);
}

module.exports = {
  shortenUrl,
  getUrls,
  getUrlByShortCode,
};
