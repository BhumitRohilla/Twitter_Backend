const express = require('express');
const router = express();
const multer = require('multer');


const upload = multer({dest:'Uploads/Profile'});

const userController = require('../Controller/user.controller');


router.route('/profile').post(upload.single('profile'),userController.profile)

router.route('/username').post(userController.username)

router.route('/follow').post(userController.follow)

router.route('/unfollow').post(userController.unfollow)

router.route('/userToFollow').post(userController.userToFollow)

router.route('/liked/:tId').get(userController.liked)

router.route('/removeLike/:tId').get(userController.removeLikes)

module.exports = router;