const express = require('express');
const {
  register,
  login,
  logout,
  checkAuth,
  changePassword,
  deleteUser,
  confirmEmail,
  getCurrentUser,
  resetPasswordEmail,
  resetPassword,
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
router.get('/me', getCurrentUser);
router.post('/reset', resetPasswordEmail);
router.post('/reset/:token', resetPassword);

module.exports = router;
