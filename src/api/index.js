const router = require('express').Router();

const authRouter = require('./auth');
const accountRouter = require('./accounts');

router.use('/auth', authRouter);
router.use('/account', accountRouter);

router.get('/', (req, res) => {
  res.render('index', {
    mess: req.flash('mess'),
  });
});

module.exports = router;
