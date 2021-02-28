const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
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
  lastMessage: {
    message: {
      type: String,
    },
    username: {
      type: String,
    },
    createdAt: {
      type: Date,
    },
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

// Encrypt password using bcrypt
room.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Match room entered password to hashed password on database
room.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('Room', room);
