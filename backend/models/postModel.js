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
    tripDate: { // ✅ New field for trip start date
        type: Date,
        required: true,
    },
    text: {
        type: String,
        maxLength: 500,
    },
    // Updated likes field to store detailed user information
    likes: {
        type: [
            {
                userId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "User",
                    required: true,
                },
                username: {
                    type: String,
                },
                userProfilePic: {
                    type: String,
                },
                isCompany: {
                    type: Boolean,
                    default: false,
                }
            }
        ],
        default: [],
    },
    // For backward compatibility - will store just the user IDs
    likeIds: {
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
            isCompany: {
                type: Boolean,
                default: false,
            },
            createdAt: {
                type: Date,
                default: Date.now,
            }
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
        max: 100000,
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
