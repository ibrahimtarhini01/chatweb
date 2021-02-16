const Chat = require('../models/Chat');

// @route   GET /api/chat/:roomId
// @desc    Get chat for a room
// @access  private
exports.getChat = async (req, res) => {
  try {
    const chat = await Chat.findOne({ room: req.params.roomId });
    if (!chat) {
      return res
        .status(400)
        .json({ errors: [{ message: "Room Doesn't exist" }] });
    }
    res.status(200).json({ success: true, data: chat });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};
