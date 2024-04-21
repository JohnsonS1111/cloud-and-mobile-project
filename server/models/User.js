import mongoose from "mongoose";

const { Schema, models } = mongoose;

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        min: 2,
        max: 50,
    },
    lastName: {
        type: String,
        required: true,
        min: 2,
        max: 50,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    picturePath: {
        type: "String",
        default:
          "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
    friends: {
        type: Array,
        default: [],
    },

   
},
    { timestamps: true }
);

const User = models.User || mongoose.model("user", userSchema);
export default User;