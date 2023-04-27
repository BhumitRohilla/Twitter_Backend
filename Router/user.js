const express = require('express');
const router = express();
const multer = require('multer');
const { updateUser, followUser, unfollowUser } = require('../Services/database/user');
const { checkIfUserExist } = require('../Controller/userAuth.controller');

const upload = multer({dest:'Uploads/Profile'});


router.route('/profile')
.post(upload.single('profile'),async (req,res)=>{
    console.log(req.file);
    console.log(req.user);
    
    try{
        await updateUser('profilepicture',req.file.filename,'u_id',req.user.u_id);
        return res.status(200).json({url:req.file.filename});
    }
    catch(err){
        return res.status(500).json({message:"Test"});
    }

})

router.route('/username')
.post(async (req,res)=>{
    let {username} = req.body;
    try{
        await updateUser('username',username,'u_id',req.user.u_id);
        return res.status(200).json({message:"Username updated"});
    }
    catch(err){
        console.log(err);
        return res.status(500).json({message:"TEST"});
    }
})


router.route('/follow')
.post(async (req,res)=>{
    let {u_id} = req.body;
    try{
        if(u_id === req.user.u_id){
            return res.status(400).json({message:"user cannot follow itself"});
        }else{
            await followUser(req.user.u_id,u_id);
            return res.status(200).json({message:"seccess"});
        }
    }
    catch(err){
        console.log(err);
        return res.status(500).json({message:"Server error occure"});
    }
})

router.route('/unfollow')
.post(async (req,res)=>{
    let {u_id} = req.body;
    try{
        if(u_id === req.user.u_id){
            return res.status(400).json({message:"user cannot unfollow itself"})
        }else{
            await unfollowUser(req.user.u_id,u_id);
            return res.status(200).json({message:"success"});
        }
    }
    catch(err){
        console.log(err);
        return res.status(500).json({message:"Sever error occure"});
    }
})

module.exports = router;