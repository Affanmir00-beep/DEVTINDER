const authmiddleware=(req,res,next)=>{
    console.log("hello from the admin route");
 const token="123456"; // this is just a dummy token for checking if the request is authorized or not. in real world we will use some kind of authentication mechanism like JWT or OAuth to check if the request is authorized or not.
    const isAuthorized=token==="123456"; // this is just a dummy logic for checking if the request is authorized or not. in real world we will use some kind of authentication mechanism like JWT or OAuth to check if the request is authorized or not.
     if(!isAuthorized){
         res.status(401).send("Unauthorized request");
        }else{
        // res.send("All data sent");
        next();
    }
};
const userauth=(req,res,next)=>{
    console.log("user is trying to access the user route");
 const token="123456"; // this is just a dummy token for checking if the request is authorized or not. in real world we will use some kind of authentication mechanism like JWT or OAuth to check if the request is authorized or not.
    const isAuthorized=token==="123456"; // this is just a dummy logic for checking if the request is authorized or not. in real world we will use some kind of authentication mechanism like JWT or OAuth to check if the request is authorized or not.
     if(!isAuthorized){
         res.status(401).send("Unauthorized user");
        }else{
        // res.send("All data sent");
        next();
    }
};
module.exports={
    authmiddleware,
    userauth,
};



