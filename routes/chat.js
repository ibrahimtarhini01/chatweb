const express = require('express');
const router = express.Router();
const Chat = require('../models/Chat');

router.get('/', async (req, res) => {
  try {
    const chat = await Chat.find();
    res.status(200).json({ success: true, data: chat });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
});

module.exports = router;
