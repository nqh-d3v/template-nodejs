/* eslint-disable max-len */
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const Account = require('../models/accounts');
// const services = require('../services/indexServices');

module.exports = function(passport) {
  passport.serializeUser( function(user, done) {
    done(null, user.id);
  });
  passport.deserializeUser( function(id, done) {
    Account.findById(id, function(err, acc) {
      if (acc) return done(err, acc);
    });
  });

  passport.use('create-mentor', new LocalStrategy({
    usernameField: 'mssv',
    passwordField: 'matkhau',
    passReqToCallback: true,
  },
  function(req, username, password, done) {
    process.nextTick(function() {
      Account.findOne({username: username, rule: 'mentor'}, async function(err, isLogup) {
        if (err) return done(err);
        if (isLogup) {
          return done(null, false, req.flash('mess', 'Người hướng dẫn này đã tồn tại!'));
        } else {
          const newAccount = new Account();
          newAccount.username = username;
          newAccount.password = newAccount.encryptPassword(password);
          newAccount.fname = req.body.hoten;
          newAccount.email = req.body.mail;
          newAccount.bdate = req.body.ngaysinh;
          newAccount.school = req.body.truong;
          newAccount.rule = 'mentor';
          newAccount.save( function(err) {
            if (err) throw err;
            return done(null, newAccount, req.flash('mess', 'Tạo người hướng dẫn thành công!'));
          });
        }
      });
    });
  }));
};

passport.use('dang-nhap', new LocalStrategy({
  usernameField: 'tendangnhap',
  passwordField: 'matkhau',
  passReqToCallback: true,
},
function(req, username, password, done) {
  Account.findOne({'username': username}, function(err, user) {
    // console.log('Lỗi: '+user);
    if (err) return done(err);
    if (!user) return done(null, false, req.flash('mess', 'Tài khoản không tồn tại'));
    if (!user.validPassword(password)) return done(null, false, req.flash('mess', 'Mật khẩu không chính xác'));
    return done(null, user);
  });
}));
