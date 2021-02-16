const Chat = require('../models/Chat');

// @route   GET /api/chat/:roomId
// @desc    Logout User
// @access  private
exports.getChat = async (req, res) => {
  try {
    const chat = await Chat.findOne({ room: req.params.roomId });
    res.status(200).json({ success: true, data: chat });
  } catch (error) {}
};
