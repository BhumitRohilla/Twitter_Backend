const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

//Controller
const authController = require('../Controller/userAuth.controller');

router.route('/login').post(authController.login);

router.route('/refresh').post(authController.refreshToken);

router.route('/logout').get(authController.logout);

router.route('/signUp').post(authController.signUp);

module.exports = router;