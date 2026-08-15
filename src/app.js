

const express=require("express");
const app=express();
const connectDB=require("./config/database");
const User = require("./models/user");






app.post("/signup",  async(req,res)=>{
    // Handle signup logic here
    const user =new User({
        firstname:"hamza",
        lastname:"sajid",
        age:"22",
        emailid:"xyz@emial.com",
        password:"affan",
        gender:"male"
    });
  

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

connectDB().then(()=>{ 
    console.log("connected to the database");
app.listen(3000,()=>{
    console.log("server is running on port 3000");
});
}
).catch(err=>{
    console.log("error connecting to the database",err);
}   );



