import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    password: String,
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user", //whenever using enum it is recommended to use default
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
    },
    resetPasswordToken: {
      type: String,
    },
    resetPasswordExpires: {
      type: Date,
    },
  },
  {
    timestamps: true, 
    // Mongodb speciality:- it makes the createdAt: NativeDate; updatedAt: NativeDate; automatically
  }
);

userSchema.pre("save", async function(next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
}); // for post userSchema.post(), no arrow function, as it is in diffrent continent so async
//save is the event(activity)
//hashing is not encryption and decryption, in hashing we cannot revert it

const User = mongoose.model("User", userSchema); //(bolu kya, kispe base pe banao)

export default User;
