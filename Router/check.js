const express = require('express');

const router = express.Router();

//Controller
const checkController = require('../Controller/check.controller');

router.route('/profile/:u_id').get(checkController.profile)

router.route('/username').post(checkController.username)

router.route('/getListOfUsers').post(checkController.getListOfUsersToFollow)

router.route('/searchUsers/:username').get(checkController.searchUsers);

module.exports = router;