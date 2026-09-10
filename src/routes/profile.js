const express=require("express");
const profilerouter=express.Router();
const User = require("../models/user");
const bcrypt=require("bcrypt");
const {userauth}=require("../middlewares/auth.js");
const { vlaidateprofiledata, validateEmail } = require("../utils/validations.js");



profilerouter.get("/profile/view", userauth, async(req,res)=>{
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
profilerouter.patch("/profile/edit",userauth,async(req,res)=>{
     try{
 if (!vlaidateprofiledata(req)){
    throw new Error("invalid edit data");
 }
  const  loggedinuser=req.user;
  Object.keys(req.body).forEach((key)=>{loggedinuser[key]=req.body[key];});
// loggedinuser.firstname=req.body.firstname || loggedinuser.firstname;
await loggedinuser.save();
res.json({ message: `${loggedinuser.firstname} profile updated successfully`,
    data: loggedinuser
 });
     }
     catch(err){
       res.status(400).send(err.message);
     }
})
profilerouter.patch("/profile/forgotpassword", userauth,async(req,res)=>{
    try {
        const { emailid, password } = req.body;
        if (!emailid || !password) {
            throw new Error("email and new password are required");
        }
        if (!validateEmail(emailid)) {
            throw new Error("email id not valid");
        }

        if (emailid.trim().toLowerCase() !== req.user.emailid) {
            throw new Error("email does not belong to the logged-in user");
        }

        const passwordHash = await bcrypt.hash(password, 10);
        req.user.password = passwordHash;
        res.send(password,passwordHash);
        await req.user.save();
        res.json({ message: "Password updated successfully" });
    }
    catch(err) {
        res.status(400).send(err.message); 
    }
})
module.exports = profilerouter;