const express = require('express');
const passport = require('passport');
const userController = require('../../controller/user.controller.js');

const router = express.Router();

// @route   POST api/users/register
// @desc    Register User
// @access  Public
router.post('/register', userController.register);

// @route   POST api/users/login
// @desc    Login User
// @access  Public
router.post('/login', userController.login);

// @route   POST api/users/logout
// @desc    Logout User
// @access  Public
router.post('/logout', userController.logout);

// @route   GET api/users/profile
// @desc    Access user's own profile page
// @access  Private
router.get('/profile', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.send(req.user);
});

module.exports = router;
