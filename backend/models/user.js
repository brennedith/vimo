const mongoose = require('mongoose');
const PLM = require('passport-local-mongoose');
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  friends: [
    {
      type: ObjectId,
      ref: 'User'
    }
  ],
  name: String,
  image_url: String
});

userSchema.plugin(PLM);

module.exports = mongoose.model('User', userSchema);
