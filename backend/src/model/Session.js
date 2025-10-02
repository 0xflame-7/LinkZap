/**
 * @author Daksha  Jha
 * @copyright 2025 0xflame-7
 * @license Apache-2.0
 */

/**
 * Node modules
 */
const { Schema, model } = require('mongoose');

const sessionSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    valid: {
      type: Boolean,
      default: true,
    },
    user_agent: {
      type: String,
      required: true,
    },
    ip: {
      type: String,
      required: true,
    },
    // TODO: Hash the refresh token and Rotate the refresh token
    refreshTokenHash: {
      type: String,
    },
  },
  { timestamps: true },
);

const Session = model('Session', sessionSchema);

module.exports = Session;
