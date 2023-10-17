const router = require('express').Router();

const apiRouters = require('./api');
const homeRoutes = require('./homeRoutes');

router.use('/', homeRoutes);
router.use('/api', apiRouters);

module.exports = router;