const router = require('express').Router();

const { checkPermission } = require('../auth/auth.permission');

/* GET users listing. */
router.get('/', checkPermission(['teacher']), (req, res) => {
  res.send('respond with a resource');
});

module.exports = router;
