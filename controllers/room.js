const Room = require('../models/Room');

// @route   POST /api/room
// @desc    Create Room
// @access  private
exports.createRoom = async (req, res) => {
  const { title, password, description } = req.body;
  let room;
  try {
    if (password) {
      room = await Room.create({
        title,
        admin: [
          {
            user: req.user.id,
            username: req.user.username,
            avatar: req.user.avatar,
          },
        ],
        password,
        description,
        members: [
          {
            user: req.user.id,
            username: req.user.username,
            avatar: req.user.avatar,
          },
        ],
      });
    } else {
      room = await Room.create({
        title,
        admin: [
          {
            user: req.user.id,
            username: req.user.username,
            avatar: req.user.avatar,
          },
        ],
        description,
        members: [
          {
            user: req.user.id,
            username: req.user.username,
            avatar: req.user.avatar,
          },
        ],
      });
    }
    res.status(200).json({ success: true, data: room });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// @route   GET /api/room/:id
// @desc    GET Room info by id
// @access  private
exports.getRoom = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) {
      return res
        .status(400)
        .json({ errors: [{ message: "Room doesn't exist" }] });
    }
    res.status(200).json({ success: true, data: room });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// @route   GET /api/room/join/:id
// @desc    Join Room
// @access  private
exports.joinRoom = async (req, res) => {
  try {
    let room = await Room.findById(req.params.id);
    if (!room) {
      return res
        .status(400)
        .json({ errors: [{ message: "Room doesn't exist" }] });
    } else if (exists(room.members, req.user.id)) {
      return res
        .status(400)
        .json({ errors: [{ message: 'You are already a member' }] });
    }

    const fieldsToUpdate = {
      members: [
        {
          user: req.user.id,
          username: req.user.username,
          avatar: req.user.avatar,
        },
        ...room.members,
      ],
    };

    await room.update(fieldsToUpdate, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// @route   GET /api/room/admin/:id
// @desc    make user admin
// @access  private
exports.makeAdmin = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) {
      return res
        .status(400)
        .json({ errors: [{ message: "Room doesn't exist" }] });
    } else if (!exists(room.admin, req.user.id)) {
      return res
        .status(400)
        .json({ errors: [{ message: 'You are not authorized' }] });
    } else if (!exists(room.members, req.body.user)) {
      return res.status(400).json({ errors: [{ message: 'User not found' }] });
    } else if (exists(room.admin, req.body.user)) {
      return res
        .status(400)
        .json({ errors: [{ message: 'User already an admin' }] });
    }
    const fieldsToUpdate = {
      admin: [
        {
          user: req.body.user,
          username: req.body.username,
          avatar: req.body.avatar,
        },
        ...room.admin,
      ],
    };

    await room.update(fieldsToUpdate, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

const exists = (group, user) => {
  let bool = false;
  group.map((member) => {
    if (member.user + '' === user + '') bool = true;
  });

  return bool;
};
