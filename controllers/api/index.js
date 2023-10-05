const router = require('express').Router();
const userRoutes = require('./userroutes');
const postRoutes = require('./postRoutres');

router.use('/users', userRoutes);
router.use('/posts', postRoutes);

module.exports = router;