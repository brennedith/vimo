const mongoose = require('mongoose');
const PLM = require('passport-local-mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  name: String,
  image_url: String
});

userSchema.plugin(PLM);

module.exports = mongoose.model('User', userSchema);
