const mongoose = require('mongoose');

const chat = new mongoose.Schema({
  message: {
    type: String,
  },
  sender: {
    id: { type: mongoose.Types.ObjectId, ref: 'User' },
    username: {
      type: String,
    },
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
