/**
 * @author Daksha  Jha
 * @copyright 2025 0xflame-7
 * @license Apache-2.0
 */

/**
 * Node modules
 */
const { z } = require('zod');

// Url schema
const urlSchema = z.object({
  url: z
    .string()
    .trim()
    .nonempty({ message: 'Url is required' })
    .url({ message: 'Invalid url' }),
});

module.exports = urlSchema;
