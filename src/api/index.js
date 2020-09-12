const router = require('express').Router();

const authRouter = require('./auth');
const accountRouter = require('./accounts');
const coursesRouter = require('./courses');
const forumRouter = require('./forum');
const libraryRouter = require('./library');
const indexRouter = require('./main');

router.use('/auth', authRouter);
router.use('/account', accountRouter);
router.use('/courses', coursesRouter);
router.use('/forum', forumRouter);
router.use('/library', libraryRouter);
router.use('/', indexRouter);

module.exports = router;
