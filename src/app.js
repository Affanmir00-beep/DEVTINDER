

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
connectDB().then(()=>{ 
    console.log("connected to the database");
app.listen(3000,()=>{
    console.log("server is running on port 3000");
});
}
).catch(err=>{
    console.log("error connecting to the database",err);
}   );



