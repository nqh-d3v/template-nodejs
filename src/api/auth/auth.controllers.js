const passport = require('passport');
const moment = require('moment');
// const authSrv = require('./auth.services');
const { infoCreateAccountEmail } = require('../../common/email/send');
const accountSrv = require('../accounts/accounts.services');

module.exports = {
  async getCreateDefaultEditorAccount(req, res) {
    const usr = 'editor';
    const info = await accountSrv.getAccountByIdentify(usr);
    let dataRes;
    if (info.length === 0) {
      dataRes = await accountSrv.createAccount(usr, 'Editor Name', 'nqh.webdev@gmail.com', 'editor');
      if (dataRes) {
        await infoCreateAccountEmail(dataRes);
      } else {
        dataRes = { err: 'Create editor account failed!' };
      }
    } else {
      const timeCreated = new Date(info[0].createdAt);
      dataRes = { err: `Editor account has been created at "${moment(timeCreated).format('DD/MM/YYYY hh:mm:ss')}"` };
    }
    res.render('blank_page', {
      data: dataRes,
    });
  },
  postLogin: passport.authenticate('dang-nhap', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true,
  }),
};
