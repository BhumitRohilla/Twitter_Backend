const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

//Controller
const authController = require('../Controller/userAuth.controller');
const { singupTokenParser } = require('../Middleware/signup');

router.route('/login').post(authController.login);

router.route('/refresh').post(authController.refreshToken);

router.route('/logout').get(authController.logout);

router.route('/checkIfUserExists').post(authController.checkIfUserExist);

router.route('/signUp').post(authController.signUp); 

router.route('/sendValidationMail').post(authController.sendValidationMail);

router.route('/checkCode').post(singupTokenParser,authController.checkCode);

module.exports = router;