

const mongoose = require('mongoose');
const validator= require('validator')

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
module.exports = mongoose.model("user", userSchema);

