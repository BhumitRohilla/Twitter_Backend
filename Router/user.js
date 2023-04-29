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

router.route('/getAllTweetsOfUser/:u_id').get(userController.getAllTweetsOfUser)

router.route('/getAllCommentsOfUser/:u_id').get(userController.getAllCommentOfUser)

router.route('/getAllLikedOfUser/:u_id').get(userController.getAllLikedOfUser)

module.exports = router;