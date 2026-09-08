const express=require("express");
const profilerouter=express.Router();
const User = require("../models/user");
const {userauth}=require("../middlewares/auth.js");



profilerouter.get("/profile", userauth, async(req,res)=>{
try{
//         const cookies=req.cookies;
//     // console.log(cookies);
//     const {token}=cookies;
//     if(!token){
//         throw new Error("invalid token");
//     }
//  const decodedmsg=await jwt.verify(token,"Aff@n123&");

//  const {_id}=decodedmsg;

// //  console.log("logged user is"+ _id);

//  const loggedinuser=await User.findById(_id);
const loggedinuser=req.user;
// req.user is set in the userauth middleware after verifying the token and fetching the user from the database.
 if(!loggedinuser){
    throw new Error("user doesnot exist")
 }
 res.send(loggedinuser);
//  console.log(decodedmsg);
} 
catch(err){
res.status(400).send(err.message)
}
})

module.exports = profilerouter;