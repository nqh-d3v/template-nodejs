const router = require('express').Router();
const { isNotLogined } = require('./auth.permission');
const authCtl = require('./auth.controllers');

router.get('/create-default-admin-account', authCtl.getCreateDefaultEditorAccount);

router.post('/login', isNotLogined, authCtl.postLogin);

module.exports = router;
