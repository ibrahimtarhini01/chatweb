const Chat = require('../models/Chat');
const Room = require('../models/Room');

// @route   GET /api/chat/:roomId
// @desc    Get chat for a room
// @access  private
exports.getChat = async (req, res) => {
  try {
    const chat = await Chat.find({ room: req.params.roomId });
    if (!chat) {
      return res
        .status(400)
        .json({ errors: [{ message: "Room Doesn't exist" }] });
    }

    res.status(200).json({ success: true, data: chats });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// @route   POST /api/chat/
// @desc    POST chat for a room
// @access  private
exports.addChat = async (req, res) => {
  try {
    const { message, sender, room, createdAt, username } = req.body;
    await Chat.create({
      message,
      sender: { id: sender, username },
      room,
      createdAt,
    });
    await Room.findByIdAndUpdate(
      room,
      { lastMessage: { message, username, createdAt } },
      {
        new: true,
        runValidators: true,
      },
    );
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};
