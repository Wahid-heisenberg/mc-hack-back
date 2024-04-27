const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
    {
      firstName: {
        type: String,
        minlength: 2,
        maxlength: 50,
      },
      lastName: {
        type: String,
        minlength: 2,
        maxlength: 50,
      },
      telephone: {
        type: String,
        validate: {
          validator: function (value) {
            return /^\d{10}$/.test(value);
          },
          message: "Please enter a valid 10-digit telephone number.",
        },
      },
      email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please enter a valid email address."],
      },
      fromGoogle: {
        type: Boolean,
        default: false,
      },
      password: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(value);
     
          },
          message: "Password must meet the specified criteria.",
        },
      },
      image: {
        type: String,
        default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
      },
      isVerified: {
        type: Boolean,
        default: false,
      },
      isAccountLocked: {
        type: Boolean,
        default: true,
      },
      verificationToken: {
        type: String,
        default: null,
      },
      userRole: {
        type: String,
        enum: ["superuser", "company", "manager", "employee"],
        default: "employee",
      },
    },
    {
      timestamps: true,
    }
  );
  

const User = mongoose.model("User", UserSchema);

module.exports = User;
