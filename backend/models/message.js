const mongoose = require('mongoose');
const { Schema } = mongoose;

/*
TODO: Make fields required
*/

const messageSchema = new Schema(
  {
    to: String, // TODO: Ref User
    from: String, // TODO: Ref User
    content: String, // TODO: Ref Content?
    status: {
      type: String,
      default: 'sending',
      enum: ['sending', 'delivered', 'open', 'reacted', 'expired']
    },
    expiry: {
      type: Date,
      default: () => {
        return Date.now() + 24 * 60 * 60 * 1000; // Defaults to 1 day
      }
    },
    loc: {
      type: {
        type: String // To prevent problems when passing type: "Point"
      },
      coordinates: [] // GeoJSON
    }
  },
  { timestamps: true }
);
messageSchema.index({
  loc: '2dsphere'
});

module.exports = mongoose.model('Message', messageSchema);
