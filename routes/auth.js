const express = require('express');
const {
  register,
  login,
  logout,
  checkAuth,
  changePassword,
  deleteUser,
  confirmEmail,
} = require('../controllers/auth');
const { protect } = require('../middleware/auth');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/logout', protect, logout);
router.get('/check', protect, checkAuth);
router.put('/password', changePassword);
router.delete('/delete', deleteUser);
router.get('/confirmation/:token', confirmEmail);

module.exports = router;
