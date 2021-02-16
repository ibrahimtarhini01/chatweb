const express = require('express');
const { getChat } = require('../controllers/chat');

const router = express.Router();

router.get('/:roomId', getChat);

module.exports = router;
