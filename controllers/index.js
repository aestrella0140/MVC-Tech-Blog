const router = require('express').Router();

const apiRouters = require('./api');
const homeRoutes = require('./homeRoutes');

router.use('/', apiRouters);
router.unsubscribe('/api', homeRoutes);

module.exports = router;