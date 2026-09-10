 const validator=require('validator'); 
 
 const vlaidatesignupdata=(req)=>{

    const  {firstname,lastname,emailid,password}=req.body;
    if(!firstname || !lastname){
        throw new Error("please enter your name")
    }
    else if(firstname.length<4||firstname.length>10){
 throw new Error("firstname must be greater than 4 and less than 10")
    }
    else if(!validator.isEmail(emailid)){
        throw new Error("email id not valid")
    }
    else if(!validator.isStrongPassword(password)){
        throw new Error("password is not strong")
    }
 }
 const vlaidateprofiledata=(req)=>{
    const allowededitfields=["firstname","lastname","age","gender","height","photourl","skills","about"];
    const isvalidoperation=Object.keys(req.body).every((field)=>allowededitfields.includes(field));
    return isvalidoperation;
 }
 const validateEmail=(emailid)=>validator.isEmail(emailid);
 module.exports={
    vlaidatesignupdata,
    vlaidateprofiledata,
    validateEmail
 }