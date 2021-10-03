const express = require('express');
const {
  createRoom,
  getRoom,
  joinRoom,
  makeAdmin,
  leaveGroup,
  kick,
  addUser,
  updateAvatar,
  updateInfo,
  editPassword,
  getUserRooms,
  removeAdmin,
  getRoomPreview,
} = require('../controllers/room');
const { protect } = require('../middleware/auth');
const router = express.Router();

router.get('/', protect, getUserRooms);
router.post('/', protect, createRoom);
router.get('/:id', protect, getRoom);
router.get('/preview/:id', protect, getRoomPreview);
router.post('/join/:id', protect, joinRoom);
router.post('/admin/:id', protect, makeAdmin);
router.put('/admin/:id', protect, removeAdmin);
router.post('/leave/:id', protect, leaveGroup);
router.post('/kick/:id', protect, kick);
router.post('/add/:id', protect, addUser);
router.post('/password/:id', protect, editPassword);
router.put('/:id', protect, updateInfo);
router.put('/avatar/:id', protect, updateAvatar);

module.exports = router;
