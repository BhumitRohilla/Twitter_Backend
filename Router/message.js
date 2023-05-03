const express = require('express');
const { getAllMessages, insertMessage,getUserToConvo } = require('../Services/database/message');
const router = express.Router();

router.post('/getAllMessages',async (req,res)=>{
    let {receiver} = req.body;
    try{
        let result = await getAllMessages(req.user.u_id,receiver);
        return res.status(200).json({result});
    }
    catch(err){
        return res.status(500).json({message:"Server error occure"});
    }
})


router.post('/sendMessage',async (req,res)=>{
    let {receiver,message} = req.body;
    try{
        let result = await insertMessage(req.user.u_id,receiver,message);
        return res.status(200).json({convo_id: result[0]});
    }
    catch(err){
        return res.status(500).json({message:'fail'});
    }
}) 

router.get('/userToConvo',async (req,res)=>{
    try{
        let result = await getUserToConvo(req.user.u_id);
        return res.status(200).json({result});
    }
    catch(err){
        return res.status(500).json({message:'Server error occure'});
    }
})

module.exports = router;