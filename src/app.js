

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
// }
      res.send("data has been sent")
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



