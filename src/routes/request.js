 const express=require('express');
 const requestrouter=express.Router();
const {userauth}=require("../middlewares/auth.js");
const Connectionrequest=require("../models/connectionrequest.js");
const User = require("../models/user");


 requestrouter.post("/request/send/:status/:touserid",userauth,async(req,res)=>{
  
try{
    // we are using userauth middleware to get the logged in user from the token and then we are getting the touserid from the params and then we are adding the logged in user to the touser's intrested array and then we are sending a response back to the user.
    const fromuserid=req.user._id;
    const touserid=req.params.touserid;
    const status=req.params.status;
    const receiver=await User.findById(touserid);
    const allowedstatus=["ignored","intrested"];
    if(!allowedstatus.includes(status)){
        return res.status(400).json({message:"invalid status type " + status});
    }
     if(!receiver){
        throw new Error("receiver user does not exist");
    }
    // we check if thereis an existing connection request from the logged in user to the receiver user and if there is then we update the status of the existing connection request instead of creating a new one.
    const existingrequest= await Connectionrequest.findOne({
       $or:[
        {fromuserid,touserid},
        {touserid,fromuserid},
       ]
    })
    if(existingrequest){
        return res.status(400).json({message:"There is already an existing request between these two users"});
    }
   
//    here we make status dynamic so that we can use the same route for different status like intrested, not intrested, etc.
const conncetionrequest=new Connectionrequest({
    fromuserid,
    touserid,
    fromusername:req.user.firstname,
    tousername:receiver.firstname,
    status
});
  const data =await conncetionrequest.save();
res.json({message:req.user.firstname + " is  sending a " + status + " request to " + receiver.firstname,data,
    sender:req.user.firstname,
    receiver:receiver.firstname,

}); 
}
catch(err){
    res.status(400).send(err.message);
}
});
requestrouter.post("/request/review/:status/:requestid",userauth,async(req,res)=>{
  try{
    const loggineuser=req.user;
// The logged-in user must be the receiver of the connection request.
// We validate the status and request ID before updating the request.
// The status can be "accepted", "rejected", or "ignored".
// If the request exists and belongs to the logged-in user, we update its status.
const {status,requestid}=req.params;
const allowedstatus=["accepted","rejected"];
if(!allowedstatus.includes(status)){
    return res.status(400).json({
        message:"staus should be valid"
    })
}
const connectionRequest = await Connectionrequest.findOne({
    _id:requestid,
    touserid:loggineuser._id,
    status:"intrested"
})
if(!connectionRequest){
    return res.status(404).json({
        message:"connection request  not found"
    })

}
connectionRequest.status=status;
const data=await connectionRequest.save();
res.json({
    message:"connection request"+status,
    data
})


  } catch(err){
    res.status(400).send(err.message)
  }
})
module.exports=requestrouter;