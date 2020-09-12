/* eslint-disable prefer-const */
/* eslint-disable max-len */
const mongoose = require('mongoose');

// eslint-disable-next-line new-cap
const accountSchema = mongoose.Schema({
  userCode: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    default: '',
  },
  fname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['teacher', 'editor', 'student'],
    default: 'student',
  },
  listClasses: [{
    idClass: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    nameClass: {
      type: String,
      required: true,
    },
  }],
},
{
  timestamps: true,
});

module.exports = mongoose.model('accounts', accountSchema);
