const User = require('../models/User');
const passport = require('passport');
const crypto = require('crypto');
const sendEmail = require('../utils/sendEmail');
const cloudinary = require('cloudinary').v2;

// @route   POST /api/auth/register
// @desc    Register User
// @access  public
exports.register = async (req, res) => {
  const { email, username, password } = req.body;
  try {
    //Check if user exists or not
    let user = await User.findOne({ $or: [{ username }, { email }] });
    if (user) {
      return res
        .status(400)
        .json({ errors: [{ message: 'User already exists' }] });
    }

    user = await User.create({
      username,
      email,
      password,
    });

    // Get reset token
    const resetToken = user.getConfirmationToken();

    await user.save({ validateBeforeSave: false });

    // Create reset URL
    const resetUrl = `http://localhost:3000/confirm/${resetToken}`;

    console.log(resetUrl);

    const message = `To verify your email click on this link : \n\n ${resetUrl}`;

    await sendEmail({
      email: email,
      subject: 'Email verification',
      message,
    });

    res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};
// @route   GET /api/auth/confirmation/:token
// @desc    Confirm Email using token
// @access  public
exports.confirmEmail = async (req, res) => {
  // Get hashed token
  const verificationToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const user = await User.findOne({
    verificationToken,
    verificationTokenExpire: { $gt: Date.now() },
  });

  if (!user) {
    return res
      .status(400)
      .json({ errors: [{ message: "User Doesn't exist" }] });
  }

  // update
  user.verfied = true;
  user.verificationToken = undefined;
  user.verificationTokenExpire = undefined;
  await user.save();
  res.status(200).json({ verfied: user.verified });
};

// @route   POST /api/auth/login
// @desc    Login User
// @access  public
exports.login = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) throw err;
    if (!user)
      return res
        .status(400)
        .json({ errors: [{ message: 'Invalid Credentials' }] });
    else {
      if (user.verfied === false) {
        return res
          .status(400)
          .json({ errors: [{ message: 'Please verify your email to login' }] });
      }
      req.logIn(user, (err) => {
        if (err) throw err;
        const val = {
          verfied: user.verified,
          _id: user._id,
          username: user.username,
          email: user.email,
          createdAt: user.createdAt,
        };
        res.status(200).json({ success: true, user: val });
      });
    }
  })(req, res, next);
};

// @route   GET /api/auth/logout
// @desc    Logout User
// @access  private
exports.logout = (req, res) => {
  req.logOut();
  res.status(200).json({ message: 'logged out' });
};

exports.getCurrentUser = (req, res) => {
  res.status(200).json({ success: true, data: req.user });
};

// @route   GET /api/auth/logout
// @desc    Check if auth
// @access  public
exports.checkAuth = (req, res) => {
  if (req.isAuthenticated()) {
    res.status(200).json({ success: true, data: true });
  } else {
    res.status(200).json({ success: false, data: false });
  }
};

// @route   PUT /api/auth/password
// @desc    Change Password
// @access  public
exports.changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  try {
    const user = await User.findById(req.user.id).select('+password');
    //Check current password
    if (!(await user.matchPassword(currentPassword))) {
      return res
        .status(400)
        .json({ errors: [{ message: 'Not a Valid Password' }] });
    }

    user.password = newPassword;
    await user.save();

    res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// @route   DELETE /api/auth/delete
// @desc    delete User
// @access  public
exports.deleteUser = async (req, res) => {
  try {
    const id = req.user.id;
    req.logOut();
    await User.findByIdAndDelete(id);

    res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// @route POST /api/auth/reset
// @desc Send Reset Password Link to Email
// @access Public
exports.resetPasswordEmail = async (req, res) => {
  const { email } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ errors: [{ message: 'User does not exist' }] });
    }
    // Get reset token
    const resetToken = user.getResetToken();
    await user.save({ validateBeforeSave: false });
    // Create reset URL
    const resetUrl = `http://localhost:3000/reset/${resetToken}`;

    console.log(resetUrl);

    const message = `To reset your password click on this link : \n\n ${resetUrl}`;

    await sendEmail({
      email: email,
      subject: 'Reset Password',
      message,
    });

    res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// @route   GET /api/auth/reset/:token
// @desc    Reset Password using token
// @access  public
exports.resetPassword = async (req, res) => {
  try {
    // Get hashed token
    const resetToken = crypto
      .createHash('sha256')
      .update(req.params.token)
      .digest('hex');

    const user = await User.findOne({
      resetToken,
      resetTokenExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res
        .status(400)
        .json({ errors: [{ message: "User Doesn't exist" }] });
    }

    // update
    user.password = req.body.password;
    user.resetToken = undefined;
    user.resetTokenExpire = undefined;
    await user.save({ validateBeforeSave: false });
    res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

exports.changeProfilePic = async (req, res) => {
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    console.log(req.body.image);

    const uploadResponse = await cloudinary.uploader.upload(req.body.image, {
      upload_preset: 'dev_setups',
      public_id: `profile_${req.user.id}`,
    });

    await User.findByIdAndUpdate(req.user.id, {
      avatar: uploadResponse.url.slice(47),
    });
    res.status(200).json({
      success: true,
      data: uploadResponse.url.slice(47),
    });
  } catch (error) {
    console.log(error);
  }
};
