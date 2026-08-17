

const mongoose=require("mongoose");


const connectDB=async()=>{
    await mongoose.connect("mongodb+srv://affanahmadmir170_db_user:svC6rqu57cr3O0Yf@namasteprc.b6hqrxj.mongodb.net/devtinder");
// try{
// mongoose.connect("ongodb+srv://affanahmadmir170_db_user:svC6rqu57cr3O0Yf@namasteprc.b6hqrxj.mongodb.net/");
// console.log("connected to the database");
// }catch(err){
//     console.log("error connecting to the database",err);
// }};
}



module.exports=connectDB;