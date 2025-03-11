import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
    name: String,
    email: String,
    password: String,
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    verificationToken: {
        type: String
    },
    resetPasswordToken: {
        type: String
    },
    resetPasswordExpires: {
        type: Date
    }
}
, 
{
    timestamps: true, // it makes the createdAt: NativeDate; updatedAt: NativeDate; automatically
});

userSchema.pre("save",async function(next){

    next();
})

const User = mongoose.model("User", userSchema);

export default User;