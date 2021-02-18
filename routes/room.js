const express = require('express');
const { createRoom, getRoom, joinRoom } = require('../controllers/room');
const { protect } = require('../middleware/auth');
const router = express.Router();

router.post('/', protect, createRoom);
router.get('/:id', protect, getRoom);
router.get('/join/:id', protect, joinRoom);

module.exports = router;
