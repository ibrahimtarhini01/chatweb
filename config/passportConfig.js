const User = require('../models/User');
const bcrypt = require('bcryptjs');
const localStrategy = require('passport-local').Strategy;

module.exports = function (passport) {
  passport.use(
    new localStrategy((username, passport, done) => {
      User.findOne({ username: username }, (err, user) => {
        if (err) throw err;
        if (!user) return done(null, false);
        bcrypt.compare(passport, user.password, (err, result) => {
          if (err) throw err;
          if (result === true) {
            return done(null, user);
          } else {
            return done(null, false);
          }
        });
      });
    }),
  );

  passport.serializeUser((user, cb) => {
    cb(null, user.id);
  });
  passport.deserializeUser((id, cb) => {
    User.findById(id, (err, user) => {
      const userInfo = {
        id: user._id,
        username: user.username,
        email: user.email,
        createdAt: user.createdAt,
        avatar: user.avatar,
        rooms: user.rooms,
      };
      cb(err, userInfo);
    });
  });
};
