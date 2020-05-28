const express = require('express');
const userRoute = require('./user.route');
const authRoute = require('./auth.route');
const postRoute = require('./post.route');
const searchRoute = require('./search.route');

const router = express.Router();

router.use('/users', userRoute);
router.use('/auth', authRoute);
router.use('/post', postRoute);
router.use('/search', searchRoute);

module.exports = router;
