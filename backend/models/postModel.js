import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    postedBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "TravelCompany",
        required: true
    },
    text:{
        type: String,
        maxLength:500
    },
    img:{
        type: String,
    },
    likes:{
        //array of user id's
        type:[mongoose.Schema.Types.ObjectId],
        ref: "User",
        default:[],
    },
    replies:[
    {
        userId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",  // Can reference both users and travel companies
            required: true
        },
        text:{
            type: String,
            required: true
        },
        userProfilePic:{
            type: String,
        },
        username:{
            type: String,
        },
        isAuthor: {
            type: Boolean,
            default: false, // Automatically determined when saving a comment
        },
    }
]
},{
    timestamps: true,
})
const Post = mongoose.model("Post",postSchema);

export default Post;