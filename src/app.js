

const express=require("express");
const app=express();
const connectDB=require("./config/database");
const User = require("./models/user");
const { vlaidatesignupdata } = require("./utils/validations.js");
const bcrypt=require('bcrypt')
const cookieparser=require('cookie-parser')
const jwt=require('jsonwebtoken')


app.use(express.json()); 
app.use(cookieparser());

app.post("/signup",async(req,res)=>{
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
// NOW  WEA RE CREATING LOGIN API
app.post("/login", async(req,res)=>{
    try{
const {emailid,password}=req.body;

 const user = await User.findOne({emailid});
 if (!user){
    throw new Error("INVALID CREDENTIALS");
 }
const ispasswordcorrect = await bcrypt.compare(password, user.password);
if(ispasswordcorrect){
    // create a jwt token
    const token= await jwt.sign({_id:user._id},"Aff@n123&")
    console.log(token);
    //  add jwt token to cookie and send the response back tot the user
    res.cookie("token", token);
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
// get api to fetch  profile and suthenticate how cookie trvael with every req
app.get("/profile", async(req,res)=>{
try{
        const cookies=req.cookies;
    // console.log(cookies);
    const {token}=cookies;
    if(!token){
        throw new Error("invalid token");
    }
 const decodedmsg=await jwt.verify(token,"Aff@n123&");

 const {_id}=decodedmsg;

//  console.log("logged user is"+ _id);

 const loggedinuser=await User.findById(_id);
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
// api to find one user by email
app.get("/user", async (req, res) => {

    // const useremail=req.body.emailid;
//   const Age=req.body.age;
    try{
        const user= await User.findOne({age:22});
     
        if(!user){
            
            res.send("user dont exist")
        } 
        else{
   res.send(user);
        }
    }catch(err){
        res.status(404).send("err finding user",err)
    }
//     const useremail = req.body.emailid;
//     // const Age=req.body.age;
//     try {
//         const user = await User.find({emailid:useremail});
//         // const user1= await User.find({age:Age})
//          if(user.length===0){
//             res.status(404).send("user not found");
//         }
//          else{
//    res.status(200).send(user);
//     console.log(user);
//          }
//     } catch (err) {
//         console.log("err found", err);
//         return res.status(500).json({ message: "server error" });
//     }
});
// now we are creating feed api the job of this feed api is to get all the suers from databse and show it
app.get("/feed", async(req,res)=>{
    // now we have to get data from database
    // const allusers=req.body;
    try{
    const alluserss=await User.find({});
    res.send(alluserss);
    }
    catch(err){
        res.status(404).send(err,"err is happeninging")
    }
});
app.delete("/user",async(req,res)=>{


     const userId=req.body.userId;

    try{
        // const userid=await User.findByIdAndDelete(_id:userId);
        // (_id:userId)  = (userId) wrriiten in mongoose because in mongoose we have to pass the id of the user to delete the user from database. and in our case we are passing the userId from the request body. so we have to pass the userId to findByIdAndDelete method. and in mongoose we have to pass the id of the user to delete the user from database. and in our case we are passing the userId from the request body. so we have to pass the userId to findByIdAndDelete method.
        //   const user=await User.findByIdAndDelete(userId);
          const user=await User.findByIdAndDelete({_id:userId});
        res.send("user deleted successfully");
        console.log(user,"user deleted successfully");
    }
  catch(err){
    console.log(err);
    res.status(404).send("error deleting user",err);
  }

});

app.patch("/user", async(req,res)=>{


    // const userId=req.body.userId;
    const useeremail=req.body.emailid;
    const updatedata=req.body;
    // const{ usreid,..updateddata}=req.body;


    try{
const Allowed_updates=[
        "photourl","skills","about","age"
    ];
    const isupdateallowed=Object.keys(updatedata).every(k=>Allowed_updates.includes(k));
  if (!isupdateallowed) {
  throw new Error("cant update this info");
}
    //  const updateddata= await User.findOneAndUpdate({emailid:useeremail},updatedata,{returnDocument:"before", runValidators: true },);
    const updateduser = await User.findByIdAndUpdate(
  userid,
  updatedata,
  {
    new: true,
    runValidators: true,
  });
     res.send("user updated successfully");
     console.log(updateddata,"user updated successfully");
    }
    catch(err){
        res.status(400).send("error while updating  user"   +err.message)
        console.log(err);
    }
});
connectDB().then(()=>{ 
    console.log("connected to the database");
app.listen(3000,()=>{
    console.log("server is running on port 3000");
});
}
).catch(err=>{
    console.log("error connecting to the database",err);
}   );

console.log("Connected state:", User.db.readyState);



