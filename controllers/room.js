const Room = require('../models/Room');
const User = require('../models/User');

// REFACTOR PROBABILITY: 100%
// add invitation token that can be updated instead of room id

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
    let rooms = [...req.user.rooms, room.id];
    await User.findByIdAndUpdate(
      req.user.id,
      { rooms },
      {
        new: true,
        runValidators: true,
      },
    );
    res.status(200).json({ success: true, data: room });
  } catch (error) {
    console.log(error);
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

    // fix later
    if (room.password !== undefined && req.body.password !== null) {
      if (!(await room.matchPassword(req.body.password))) {
        return res
          .status(400)
          .json({ errors: [{ message: 'Not a Valid Password' }] });
      }
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

    let rooms = [...req.user.rooms, room.id];
    await User.findByIdAndUpdate(
      req.user.id,
      { rooms },
      {
        new: true,
        runValidators: true,
      },
    );

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    console.log(error);
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
          user: req.body.user,
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

    let u = await User.findById(req.body.user);
    let rooms = [...u.rooms, room.id];
    await u.update(
      { rooms },
      {
        new: true,
        runValidators: true,
      },
    );

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
    } else if (!exists(room.admin, req.user.id)) {
      return res
        .status(400)
        .json({ errors: [{ message: 'User not authorized' }] });
    }
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    const uploadResponse = await cloudinary.uploader.upload(req.body.image, {
      upload_preset: 'dev_setups',
      public_id: `room_${room.id}`,
    });

    await room.update(
      {
        avatar: uploadResponse.url.slice(47),
      },
      {
        new: true,
        runValidators: true,
      },
    );
    res.status(200).json({
      success: true,
      data: uploadResponse.url.slice(47),
    });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// @route   POST /api/room/password/:id
// @desc    add or update room password
// @access  private
exports.editPassword = async (req, res) => {
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
    if (room.password === undefined) {
      room.password = req.body.password;
    } else {
      if (!(await room.matchPassword(req.body.currentPassword))) {
        return res
          .status(400)
          .json({ errors: [{ message: 'Not a Valid Password' }] });
      }
      room.password = req.body.password;
    }

    await room.save();

    res.status(200).json({
      success: true,
    });
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
