import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "TravelCompany",
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    text: {
        type: String,
        maxLength: 500,
    },
    likes: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "User",
        default: [],
    },
    replies: [
        {
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                required: true,
            },
            text: {
                type: String,
                required: true,
            },
            userProfilePic: {
                type: String,
            },
            username: {
                type: String,
            },
            isAuthor: {
                type: Boolean,
                default: false,
            },
        },
    ],
    title: {
        type: String,
        trim: true,
    },
    location: {
        type: String,
        trim: true,
    },
    duration: {
        type: Number,
        min: 1,
        max: 30,
    },
    price: {
        type: Number,
        min: 0,
    },
    rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5,
    },
    image: {
        type: String,
    },
    category: {
        type: String,
        enum: ["Adventure", "Cultural", "Nature", "Urban", "Relaxation"],
    },
    tourType: {
        type: String,
        enum: ["Group", "Private", "Self-guided"],
    },
}, {
    timestamps: true,
});

postSchema.index({ location: 'text', title: 'text' });

const Post = mongoose.model("Post", postSchema);

export default Post;


/*
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

export default Post;*/