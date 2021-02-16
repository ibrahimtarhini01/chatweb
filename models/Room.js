const mongoose = require('mongoose');

const room = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
  },
  admin: {
    type: [mongoose.Types.ObjectId],
    ref: 'User',
  },
  members: {
    type: [mongoose.Types.ObjectId],
    ref: 'User',
  },
  password: {
    type: String,
    minlength: 6,
  },
  avatar: {
    type: String,
    default: 'v1608731788/images/defualt_kzmons.png',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Room', room);
