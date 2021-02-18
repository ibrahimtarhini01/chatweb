const mongoose = require('mongoose');

const room = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
  },
  description: {
    type: String,
    minlength: 1,
    maxlength: 256,
    required: [true, 'Please add a description'],
  },
  admin: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
      },
      avatar: {
        type: String,
      },
      username: {
        type: String,
      },
    },
  ],
  members: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
      },
      avatar: {
        type: String,
      },
      username: {
        type: String,
      },
    },
  ],
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
