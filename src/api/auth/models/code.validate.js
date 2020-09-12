/* eslint-disable prefer-const */
/* eslint-disable max-len */
const mongoose = require('mongoose');

// eslint-disable-next-line new-cap
const codeValidSchema = mongoose.Schema({
  cname: {
    type: String,
    required: true,
  },
  ccode: {
    type: String,
    required: true,
  },
  rule: {
    type: String,
    enum: ['resetPassword', 'createAdminAccount'],
    default: 'resetPassword',
  },
  forUser: {
    type: String,
    required: true,
  },
},
{
  timestamps: true,
});

module.exports = mongoose.model('codeValidate', codeValidSchema);
