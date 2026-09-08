const express=require('express');
const  authrouter=express.Router();
const { vlaidatesignupdata } = require("../utils/validations.js");
const bcrypt=require('bcrypt');
const User = require("../models/user");
const {userauth}=require("../middlewares/auth.js");






authrouter.post("/signup",async(req,res)=>{
    try{
// validation of data
    vlaidatesignupdata(req);
         // in this we a re trying to figure out can we console log our req
    // Handle signup logic here
    // now wea re going to encrupt passsword then we gonna save it to db
 const {password,firstname,lastname,emailid,age,gender}=req.body;
 const passwordHash= await bcrypt.hash(password,10);
 console.log(passwordHash);
    const user =new User({
        firstname,
        lastname,
        emailid,
        password:passwordHash,
        age,
        gender
    }); 
          // new user is an instance of our user model.  
     await user.save();
    //  user .save() save data to database.
    res.send("user added successfully");
    // console.log("user")
    }
    catch(err){
res.status(400).send(err.message)
    }
});
authrouter.post("/login", async(req,res)=>{
    try{
const {emailid,password}=req.body;
 const user = await User.findOne({emailid});
 if (!user){
    throw new Error("INVALID CREDENTIALS");
 }
const ispasswordcorrect = await user.validatepass(password);
if(ispasswordcorrect){
    // create a jwt token
const token=user.getjwt();  
    //  add jwt token to cookie and send the response back tot the user
    res.cookie("token", token, {
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
        // httpOnly: true
    });
    res.send("login successfull");
}
else{
    throw new Error("INAVLAID CREDENTIALS");
}
    }
    catch(err){
    res.status(400).send(err.message)
    }
});


module.exports=authrouter; ;

