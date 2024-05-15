import mongoose, { Schema } from "mongoose"

const userSchame = new Schema({
    username: {
        type:String,
        required: [true, "Please enter a username"],
        unique: true,
    },
    email: {
        type:String,
        required: [true, "Please enter a email"],
        unique: true,
    },
    password:{
        type : String,
        required: [true, "Please provide a password"],
        default: false,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    isAdmin: {
        type:Boolean,
        default: false,
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
})
const User = mongoose.models.users || mongoose.model("users", userSchame);
export default User;