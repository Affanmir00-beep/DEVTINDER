

const express=require("express");
const app=express();
const connectDB=require("./config/database");
const User = require("./models/user");





app.use(express.json());

app.post("/signup",async(req,res)=>{

   
    // in this we a re trying to figure out can we console log our req
    // Handle signup logic here
    const user =new User(req.body);
    try{
          // new user is an instance of our user model.  
     await user.save();
    //  user .save() save data to database.
    res.send("user added successfully");
    console.log("user")
    }
    catch(err){
res.status(400).send("bad request");
    }
});




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
     const updateddata= await User.findOneAndUpdate({emailid:useeremail},updatedata,{returnDocument:"before"},);
     res.send("user updated successfully");
     console.log(updateddata,"user updated successfully");
    }
    catch(err){
        res.status(400).send("error while updating  user")
        console.log(err);
    }
})


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



