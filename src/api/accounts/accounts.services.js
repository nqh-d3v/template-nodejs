const Accounts = require('./models/accounts');
const { encryptedPassword, createPassword } = require('../auth/auth.password');

async function createAccount(usr, fname, email, role) {
  const newTeacher = new Accounts();
  const pwd = createPassword();
  newTeacher.userCode = usr;
  newTeacher.password = encryptedPassword(pwd);
  newTeacher.fname = fname || 'Default name';
  newTeacher.role = role || 'student';
  newTeacher.email = email;
  await newTeacher.save({}, (err) => {
    if (err) throw err;
  });
  newTeacher.password = pwd;
  return newTeacher;
}

async function getAccountByIdentify(identify) {
  const all = await Accounts.find({
    $or: [
      { userCode: identify },
      { fname: identify },
      { email: identify },
    ],
  });
  return all;
}

module.exports = {
  createAccount,
  getAccountByIdentify,
};
