const mongoose = require('mongoose');

const chat = new mongoose.Schema({
  message: {
    type: String,
  },
  sender: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
  },
  room: {
    type: mongoose.Types.ObjectId,
    ref: 'Room',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Chat', chat);
