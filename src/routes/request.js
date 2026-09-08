 const express=require('express');
 const requestrouter=express.Router();
const {userauth}=require("../middlewares/auth.js");


 requestrouter.post("/sendconnectionrequest",userauth,async(req,res)=>{
    const user=req.user;
    console.log("sendin connection request");
    res.send(user.firstname+" is sending connection request to "+req.body.to);
})


module.exports=requestrouter;