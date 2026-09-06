const  jwt=require("jsonwebtoken")
 const User=require("../models/user");
// const authmiddleware=(req,res,next)=>{
//     console.log("hello from the admin route");
//  const token="123456"; // this is just a dummy token for checking if the request is authorized or not. in real world we will use some kind of authentication mechanism like JWT or OAuth to check if the request is authorized or not.
//     const isAuthorized=token==="123456"; // this is just a dummy logic for checking if the request is authorized or not. in real world we will use some kind of authentication mechanism like JWT or OAuth to check if the request is authorized or not.
//      if(!isAuthorized){
//          res.status(401).send("Unauthorized request");
//         }else{
//         // res.send("All data sent");
//         next();
//     }
// };
// const userauth=(req,res,next)=>{
//     console.log("user is trying to access the user route");
//  const token="123456"; // this is just a dummy token for checking if the request is authorized or not. in real world we will use some kind of authentication mechanism like JWT or OAuth to check if the request is authorized or not.
//     const isAuthorized=token==="123456"; // this is just a dummy logic for checking if the request is authorized or not. in real world we will use some kind of authentication mechanism like JWT or OAuth to check if the request is authorized or not.
//      if(!isAuthorized){
//          res.status(401).send("Unauthorized user");
//         }else{
//         // res.send("All data sent");
//         next();
//     }
// };

// module.exports={
//     authmiddleware,
//     userauth,
// };

const userauth= async(req,res,next)=>{
 
 try{
     // read the token from req cookies
    // { // const  cookies=req.cookies;
    // const {token}=cookies;}(also a valid way to write)
    const {token}=req.cookies;
    if(!token){
        throw new Error("token not found");
    }
    // validate the token
     const decodedobj= await jwt.verify(token,"Aff@n123&");
     const {_id}=decodedobj;
    //  find the user in the database
    const user= await User.findById(_id);
     if(!user){
        throw new Error("user doesnot found");
     }
     req.user=user;
     next();
 }  
 catch(err){
    res.status(401).send("Error: " + err.message);
 }
// // Read the JWT from cookies.
// Verify and decode it.
// Extract the user ID.
// Find that user in the database.
// Store the user on req.
// Call next() so the protected route continue

    // find the username



}


module.exports={
    userauth
}



