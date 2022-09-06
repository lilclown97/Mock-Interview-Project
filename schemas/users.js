const mongoose = require('mongoose');

const UsersSchema = mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  nickname: {
    type: String,
    required: true,
    unique: true,
  },
});
UsersSchema.virtual('userNo').get(function () {
  return this._id.toHexString();
});
UsersSchema.set('toJSON', {
  virtuals: true,
});

module.exports = mongoose.model('Users', UsersSchema);
