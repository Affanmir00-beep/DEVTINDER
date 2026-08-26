  database vlidations
  const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: [true, "First name is required"],
      trim: true,
      minlength: [2, "First name must be at least 2 characters"],
      maxlength: [30, "First name cannot exceed 30 characters"],
      match: [/^[a-zA-Z\s'-]+$/, "First name contains invalid characters"],
    },

    lastname: {
      type: String,
      required: [true, "Last name is required"],
      trim: true,
      minlength: [2, "Last name must be at least 2 characters"],
      maxlength: [30, "Last name cannot exceed 30 characters"],
      match: [/^[a-zA-Z\s'-]+$/, "Last name contains invalid characters"],
    },

    age: {
      type: Number,
      required: [true, "Age is required"],
      min: [18, "User must be at least 18 years old"],
      max: [100, "Please enter a valid age"],
      validate: {
        validator: Number.isInteger,
        message: "Age must be a whole number",
      },
    },

    emailid: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      maxlength: [254, "Email is too long"],
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Please enter a valid email address",
      ],
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters"],
      maxlength: [128, "Password cannot exceed 128 characters"],
      select: false,
    },

    gender: {
      type: String,
      required: [true, "Gender is required"],
      enum: {
        values: ["male", "female", "other"],
        message: "Gender must be male, female, or other",
      },
    },

    height: {
      type: Number,
      min: [50, "Height must be at least 50 cm"],
      max: [250, "Height cannot exceed 250 cm"],
    },

    photourl: {
      type: String,
      trim: true,
      default:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVIB43fvbAhv1AZd3UdeZ_CtCXuZ8_F_pHThVrNfpfO5owIIBud92y4rw&s=10",
      match: [/^https?:\/\/.+/i, "Photo URL must be a valid URL"],
    },

    skills: {
      type: [String],
      validate: {
        validator: (skills) =>
          skills.length <= 20 &&
          skills.every(
            (skill) =>
              typeof skill === "string" &&
              skill.trim().length >= 1 &&
              skill.trim().length <= 30
          ),
        message: "Skills must contain up to 20 valid skill names",
      },
    },

    about: {
      type: String,
      trim: true,
      maxlength: [500, "About section cannot exceed 500 characters"],
      default: "This is the default description of user",
    },
  },
  {
    timestamps: true,
    strict: true,
  }
);

module.exports = mongoose.model("User", userSchema);