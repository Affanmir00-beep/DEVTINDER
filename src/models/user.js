

const mongoose = require('mongoose');
const validator= require('validator');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        maxlength: 10,
        minlength: 4
    },
    lastname: {
        type: String,
    },
    age: {
        type: Number,
        required: true,
        min: 18,
    },
    emailid: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
       trim: true,
       validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Invalid Email :" + value)
            }
        }
    },
    password: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true,
        // validate(value) {
        //     if (!['male', 'female', 'other'].includes(value)) {
        //         throw new Error('Invalid gender');
        //     }
        // }
        validate(value){
            if(!["male","female","other"].includes(value)){
                throw new Error("gender data is not valid");
            }
        }
    },
    height: {
        type: String
    },
    photourl:{ 
        type: String,
        default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVIB43fvbAhv1AZd3UdeZ_CtCXuZ8_F_pHThVrNfpfO5owIIBud92y4rw&s=10",
           validate(value) {
            if (!validator.isURL(value)) {
                throw new Error("Invalid URL :" + value)
            }
        }
    },
    skills: {
        type: [String]
    },
    about:{
        type: String,
        default: "this is the default description of user"
    },
    password:{
        type: String,
      required: true,
           validate(value) {
            if (!validator.isStrongPassword(value)) {
                throw new Error("Enter a strong password :" + value)
            }
        }
    }
},{
    timestamps:true
});
// now we are creating helper methods /handler methods to offload a lot of things we dont have to write creating a wt token in app.js file and also we dont have to write the logic of finding the user in the database in app.js file. we can write it here in user model file and then we can call it in app.js file. so that we can offload a lot of things from app.js file and keep it clean and readable. so we are creating a method called generateAuthToken which will generate a jwt token for the user and return it. and we are creating another method called findByCredentials which will find the user in the database by emailid and password and return the user object. so that we can use it in app.js file to login the user.
// just like we offload validation using validator .js and use it in app.js file
// we dont gonnna use arrow functioin  here bcz it gonna break things( we gonna use normal function bcz we want to use this keyword here and this keyword is not available in arrow function)
 userSchema.methods.getjwt= async function(){
    const user=this;
   const token= await jwt.sign({_id:user._id},"Aff@n123&",{expiresIn:"1d"});
return token;
 }

 userSchema.methods.validatepass= async function(passwordinputbyuser){
    const user=this;
    const passwordhash=user.password;
    const ispasswprdvalid= await bcrypt.compare(passwordinputbyuser, passwordhash);
    return ispasswprdvalid;
 }
module.exports = mongoose.model("user", userSchema);

