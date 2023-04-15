const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

//Controller
const authController = require('../Controller/userAuth.controller');

router.route('/login').post(authController.login);

router.route('/refresh').post(authController.refreshToken);

module.exports = router;