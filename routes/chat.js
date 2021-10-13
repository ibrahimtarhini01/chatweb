const express = require('express');
const { getChat, addChat } = require('../controllers/chat');

const router = express.Router();

router.get('/:roomId', getChat);
router.post('/', addChat);

module.exports = router;
