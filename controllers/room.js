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

// @route   POST /api/room/admin/:id
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

// @route   POST /api/room/leave/:id
// @desc    leave group
// @access  private
exports.leaveGroup = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) {
      return res
        .status(400)
        .json({ errors: [{ message: "Room doesn't exist" }] });
    } else if (!exists(room.members, req.user.id)) {
      return res
        .status(400)
        .json({ errors: [{ message: 'User not a member' }] });
    }

    let fieldsToUpdate = {
      members: room.members.filter((member) => {
        return member.user + '' !== req.user.id + '';
      }),
      admin: room.admin.filter((member) => {
        return member.user + '' !== req.user.id + '';
      }),
    };
    console.log(fieldsToUpdate);
    if (fieldsToUpdate.members[0] === null) {
      fieldsToUpdate.members = [];
      fieldsToUpdate.admin = [];
    }
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

// @route   POST /api/room/kick/:id
// @desc    leave group
// @access  private
exports.kick = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) {
      return res
        .status(400)
        .json({ errors: [{ message: "Room doesn't exist" }] });
    } else if (!exists(room.admin, req.user.id)) {
      return res
        .status(400)
        .json({ errors: [{ message: 'User not authorized' }] });
    }

    let fieldsToUpdate = {
      members: room.members.filter((member) => {
        return member.user + '' !== req.body.user + '';
      }),
      admin: room.admin.filter((member) => {
        return member.user + '' !== req.body.user + '';
      }),
    };
    console.log(fieldsToUpdate);
    if (fieldsToUpdate.members[0] === null) {
      fieldsToUpdate.members = [];
      fieldsToUpdate.admin = [];
    }
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

// @route   GET /api/room/add/:id
// @desc    Join Room
// @access  private
exports.addUser = async (req, res) => {
  try {
    let room = await Room.findById(req.params.id);
    if (!room) {
      return res
        .status(400)
        .json({ errors: [{ message: "Room doesn't exist" }] });
    } else if (exists(room.members, req.body.id)) {
      return res
        .status(400)
        .json({ errors: [{ message: 'User already a member' }] });
    } else if (!exists(room.admin, req.user.id)) {
      return res
        .status(400)
        .json({ errors: [{ message: 'User not authorized' }] });
    }

    const fieldsToUpdate = {
      members: [
        {
          user: req.body.id,
          username: req.body.username,
          avatar: req.body.avatar,
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

// @route   PUT /api/room/:id
// @desc    update group info
// @access  private
exports.updateInfo = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) {
      return res
        .status(400)
        .json({ errors: [{ message: "Room doesn't exist" }] });
    } else if (!exists(room.admin, req.user.id)) {
      return res
        .status(400)
        .json({ errors: [{ message: 'User not authorized' }] });
    }

    const fieldsToUpdate = {
      title: req.body.title,
      description: req.body.description,
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

// @route   PUT /api/room/avatar/:id
// @desc    update room avatar
// @access  private
exports.updateAvatar = async (req, res) => {
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

const exists = (group, user) => {
  let bool = false;
  group.map((member) => {
    if (member.user + '' === user + '') bool = true;
  });

  return bool;
};
