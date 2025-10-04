/**
 * @author Daksha  Jha
 * @copyright 2025 0xflame-7
 * @license Apache-2.0
 */

/**
 * Custom modules
 */
const Url = require('../model/Url');
const { NotFoundError } = require('../middleware/errorHandler');

const getUrlsInCreatedAtOrder = async (userId) => {
  const urls = await Url.find({ userId }).sort({ createdAt: -1 });
  return urls;
};

const createUrl = async (urlData) => {
  const url = await Url.create(urlData);
  return url;
};

/**
 * Find a URL by shortCode, check if active & not expired,
 * increment clicks atomically, and return it.
 */
const findAndHit = async (shortCode) => {
  const now = new Date();

  const url = await Url.findOneAndUpdate(
    {
      shortCode,
      isActive: true,
      $or: [{ expiresAt: null }, { expiresAt: { $gt: now } }],
    },
    { $inc: { clicks: 1 } },
    { new: true },
  );

  if (!url) {
    throw new NotFoundError('URL not found or expired');
  }

  return url;
};
module.exports = {
  getUrlsInCreatedAtOrder,
  createUrl,
  findAndHit,
};
