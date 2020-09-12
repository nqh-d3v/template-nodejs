const bcrypt = require('bcryptjs');

module.exports = {
  encryptedPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
  },
  isValidPassword(pwdInp, pwdSave) {
    return bcrypt.compareSync(pwdInp, pwdSave);
  },
  randStr() {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < 8; i += 1) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  },
  createPassword() {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < 8; i += 1) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return `${Date.now()}_${result}`;
  },
};
