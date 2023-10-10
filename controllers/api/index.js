const router = require('express').Router();
const userRoutes = require('./userroutes');
const postRoutes = require('./postRoutes');

router.use('/users', userRoutes);
router.use('/posts', postRoutes);

module.exports = router;