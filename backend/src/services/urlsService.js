/**
 * @author Daksha  Jha
 * @copyright 2025 0xflame-7
 * @license Apache-2.0
 */

const config = require('../config');
const generateUniqueId = require('../lib/nanoid');

function shortenUrl({ url }) {
  const shortCode = generateUniqueId();
  return {
    shortUrl: `${config.CLIENT_URL}/r/${shortCode}`,
    shortCode: shortCode,
  };
}

module.exports = {
  shortenUrl,
};
