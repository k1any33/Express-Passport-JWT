const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  userName: { type: String },
  email: { type: String },
  password: { type: String },
});

module.exports = User = mongoose.model('User', userSchema);
