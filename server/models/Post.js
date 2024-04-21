import mongoose from "mongoose";

const { Schema, models } = mongoose;

const postSchema = new Schema({
    userId: {
        type: String,
        required: true,
    },
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
    description: {
        type: String,
    },
    picturePath: {
        type: "String",
        default:
          "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },

    userPicturePath: {
        type: "String",
        default:
          "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },

    likes: {
        type: Map,
        of: Boolean,
    },
    comments: {
        type: Array,
       default: []
    },

   
},
    { timestamps: true }
);

const Post = models.User || mongoose.model("post", postSchema);
export default Post;