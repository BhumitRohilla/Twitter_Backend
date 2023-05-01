const express = require('express');
const router = express();
const multer = require('multer');


const uploadProfile = multer({dest:'Uploads/Profile'});

const storage = multer.diskStorage({
    destination: function (req, file, cd) {
        if (file.fieldname === 'profileImg') {
            cd(null, 'Uploads/Profile');
        }

        else if (file.fieldname === 'headerImg') {
            cd(null, 'Uploads/Header');
        }
        
    }
  })

const upload = multer({storage})

const userController = require('../Controller/user.controller');


router.route('/profile').post(uploadProfile.single('profile'),userController.profile)

router.route('/username').post(userController.username)

router.route('/follow').post(userController.follow)

router.route('/unfollow').post(userController.unfollow)

router.route('/userToFollow').post(userController.userToFollow)

router.route('/liked/:tId').get(userController.liked)

router.route('/removeLike/:tId').get(userController.removeLikes)

router.route('/getAllTweetsOfUser/:u_id').get(userController.getAllTweetsOfUser)

router.route('/getAllCommentsOfUser/:u_id').get(userController.getAllCommentOfUser)

router.route('/getAllLikedOfUser/:u_id').get(userController.getAllLikedOfUser)

router.route('/checkFollowStatus/:u_id').get(userController.checkFollowStatus)

router.route('/updateProfile/').post(upload.fields([{name:'profileImg',maxCount:1},{name:'headerImg',maxCount:1}]),userController.updateProfile)

router.route('/getNotifications').get(userController.getNotifications);

module.exports = router;