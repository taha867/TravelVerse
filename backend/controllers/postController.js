import TravelCompany from "../models/travelcompanyModel.js";
import Post from "../models/postModel.js";

const createPost = async (req,res) => {
    try {
        const {postedBy,text,img} = req.body;

        if(!postedBy || !text){
            return res.status(400).json({message: "Post must have a postedBy and text"});
        }

        const company = await TravelCompany.findById(postedBy);

        if(!company){
            return res.status(404).json({message: "Travel Company not found"});
        }

        if(company._id.toString() !== req.user._id.toString()) {
            return res.status(401).json({message: "Unauthorized to create Post"});
        }

        const maxLength = 500;
        if(text.length > maxLength){
            return res.status(400).json({message: `Text must not exceed ${maxLength} characters`});
        }

        const newPost = new Post({postedBy, text, img});

        await newPost.save();

        return res.status(201).json({message:"Post created successfully", newPost});
        

    } catch (error) {
        res.status(500).json({error: error.message});
        console.log("Error in createPost: ", error.message);
    }
};

const getPost = async (req, res) => {
try {
    const post = await Post.findById(req.params.id);

    if(!post){
        return res.status(404).json({message: "Post not found"});
    }
    
    res.status(200).json({message:"Post found", post});


} catch (error) {
    res.status(500).json({error: error.message});
}
};

const deletePost = async (req, res) => {
try {
    const post = await Post.findById(req.params.id);
    if(!post){
        return res.status(404).json({message: "Post not found"});
    }
    
    if(post.postedBy.toString() !== req.user._id.toString()) {
        return res.status(401).json({message: "Unauthorized to delete Post"});
    }

    await Post.findByIdAndDelete(req.params.id);

    res.status(200).json({message:"Post deleted successfully"});

} catch (error) {
    res.status(500).json({error: error.message});
}
};

const likeunlikepost = async (req, res) => {
    try {
        const { id: postId } = req.params;

        // Get the current user's ID (can be from a User or TravelCompany)
        const currentUser = req.user || req.travelCompany;

        if (!currentUser) {
            return res.status(401).json({ message: "Unauthorized: User or Travel Company not logged in" });
        }

        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        // Check if the user already liked the post
        const userLikedPost = post.likes.includes(currentUser._id);

        if (userLikedPost) {
            // Unlike post
            await Post.updateOne({ _id: postId }, { $pull: { likes: currentUser._id } });
            res.status(200).json({ message: "Post unliked successfully" });
        } else {
            // Like post
            await Post.updateOne({ _id: postId }, { $push: { likes: currentUser._id } });
            res.status(200).json({ message: "Post liked successfully" });
        }
    } catch (error) {
        console.error("Error in likeunlikepost:", error.message);
        res.status(500).json({ error: error.message });
    }
};

const replyToPost = async (req, res) => {
    try {
        const { text } = req.body;
        const postId = req.params.id;

        // Extract user details from req.user
        const { _id: userId, profilePic = "", username, companyName, role } = req.user;

        if (!text) {
            return res.status(400).json({ message: "Reply must have text" });
        }

        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        // Determine if the reply is from the post's author
        const isAuthor = post.postedBy.toString() === userId.toString();

        // Create a reply
        const reply = {
            userId,
            text,
            userProfilePic: profilePic,
            username: role === "User" ? username : companyName, // Use companyName for TravelCompany
            isAuthor, // Set isAuthor based on whether the user is the post's author
        };

        post.replies.push(reply);
        await post.save();

        res.status(200).json({ message: "Reply added successfully", post });
    } catch (error) {
        console.error("Error in replyToPost:", error.message);
        res.status(500).json({ error: error.message });
    }
};


export {createPost, getPost,deletePost,likeunlikepost, replyToPost};