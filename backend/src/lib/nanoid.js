/**
 * @author Daksha  Jha
 * @copyright 2025 0xflame-7
 * @license Apache-2.0
 */

/**
 * Node modules
 */
const { nanoid } = require('nanoid');

function generateUniqueId(length = 10) {
  return nanoid(length);
}

module.exports = generateUniqueId;
