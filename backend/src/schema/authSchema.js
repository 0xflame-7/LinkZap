/**
 * @author Daksha  Jha
 * @copyright 2025 0xflame-7
 * @license Apache-2.0
 */

/**
 * Node modules
 */
const { z } = require('zod');

// Register schema
const registerSchema = z.object({
  name: z.string().trim().nonempty({ message: 'Name is required' }),

  email: z
    .string()
    .trim()
    .nonempty({ message: 'Email is required' })
    .email({ message: 'Invalid email' }),

  password: z
    .string()
    .trim()
    .nonempty({ message: 'Password is required' })
    .min(6, { message: 'Password must be at least 6 characters long' }),
});

// Login schema
const loginSchema = z.object({
  email: z.string().trim().nonempty({ message: 'Email is required' }).email({
    message: 'Invalid email',
  }),

  password: z
    .string()
    .trim()
    .nonempty({ message: 'Password is required' })
    .min(6, { message: 'Password must be at least 6 characters long' }),
});

module.exports = { registerSchema, loginSchema };
