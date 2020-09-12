/* eslint-disable func-names */
/* eslint-disable no-shadow */
/* eslint-disable consistent-return */
/* eslint-disable max-len */
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const { isValidPassword } = require('./auth.password');

const Accounts = require('../accounts/models/accounts');

module.exports = function (passport) {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser((id, done) => {
    Accounts.findById(id, (err, acc) => {
      if (acc) return done(err, acc);
    });
  });
};

passport.use('dang-nhap', new LocalStrategy({
  usernameField: 'ma-nguoi-dung',
  passwordField: 'mat-khau',
  passReqToCallback: true,
},
(async (req, username, password, done) => {
  const info = await Accounts.findOne({ userCode: username }, (err) => {
    if (err) return done(err);
  });
  if (!info) return done(null, false, req.flash('mess', 'Mã người dùng không tồn tại.'));
  if (isValidPassword(password, info.password)) return done(null, false, req.flash('mess', 'Mật khẩu không chính xác.'));
  return done(null, info);
})));
