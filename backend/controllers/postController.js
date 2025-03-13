//import TravelCompany from "../models/travelcompanyModel.js";
import Post from "../models/postModel.js";

const createPost = async (req, res) => {
    try {
        const { createdBy, text, title, location, duration, price, category, tourType, image, tripDate } = req.body;

        if (!createdBy) {
            return res.status(400).json({ message: "CreatedBy is a required field." });
        }

        if (!tripDate) {
            return res.status(400).json({ message: "Trip date is required." });
        }

        const newEntry = new Post({
            createdBy,
            text,
            title,
            location,
            duration,
            price,
            category,
            tourType,
            image,
            tripDate, // ✅ Save trip start date
        });

        await newEntry.save();

        res.status(201).json({ message: "Post created successfully.", newEntry });
    } catch (error) {
        console.error("Error in createPost:", error.message);
        res.status(500).json({ error: error.message });
    }
};

const getPost = async (req, res) => {
    try {
        // Use populate to get more details if needed
        const entry = await Post.findById(req.params.id);

        if (!entry) {
            return res.status(404).json({ message: "Entry not found." });
        }

        // Format the response to include all necessary data
        const formattedPost = {
            ...entry.toObject(),
            // Ensure likes are properly formatted for the frontend
            likes: entry.likes || [],
            likeIds: entry.likeIds || [],
            replies: entry.replies || []
        };

        res.status(200).json({ 
            message: "Entry found.", 
            post: formattedPost 
        });
    } catch (error) {
        console.error("Error in getPost:", error.message);
        res.status(500).json({ error: error.message });
    }
};


const getAllPosts = async (req, res) => {
    try {
        const { location, minPrice, maxPrice, minDuration, maxDuration, rating, categories, type, startDate, endDate } = req.query;

        let filter = {};

        if (location) {
            filter.location = { $regex: location, $options: "i" }; 
        }

        if (minPrice || maxPrice) {
            filter.price = {};
            if (minPrice) filter.price.$gte = Number(minPrice);
            if (maxPrice) filter.price.$lte = Number(maxPrice);
        }

        if (minDuration || maxDuration) {
            filter.duration = {};
            if (minDuration) filter.duration.$gte = Number(minDuration);
            if (maxDuration) filter.duration.$lte = Number(maxDuration);
        }

        if (rating) {
            filter.rating = { $gte: Number(rating) };
        }

        if (categories) {
            filter.category = { $in: categories.split(",") };
        }

        if (type) {
            filter.tourType = { $in: type.split(",") };
        }

        if (startDate || endDate) {
            filter.tripDate = {};
            if (startDate) filter.tripDate.$gte = new Date(startDate);
            if (endDate) filter.tripDate.$lte = new Date(endDate);
        }

        console.log("🔍 Applied Filters:", JSON.stringify(filter, null, 2));

        const posts = await Post.find(filter);
        console.log(`✅ Found ${posts.length} posts after filtering`);

        res.status(200).json({ posts });

    } catch (error) {
        console.error("❌ Error in getAllPosts:", error.message);
        res.status(500).json({ error: error.message });
    }
};




const getPostsByCompany = async (req, res) => {
    try {
        const { companyId } = req.params;

        const posts = await Post.find({ createdBy: companyId });

        if (!posts || posts.length === 0) {
            return res.status(404).json({ message: "No posts found." });
        }

        res.status(200).json({ posts });
    } catch (error) {
        console.error("Error in getPostsByCompany:", error.message);
        res.status(500).json({ error: error.message });
    }
};





const deletePost = async (req, res) => {
    try {
        const entry = await Post.findById(req.params.id);

        if (!entry) {
            return res.status(404).json({ message: "Entry not found." });
        }

        if (entry.createdBy.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: "Unauthorized to delete this entry." });
        }

        await Post.findByIdAndDelete(req.params.id);

        res.status(200).json({ message: "Entry deleted successfully." });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const likeunlikepost = async (req, res) => {
    try {
        const { id } = req.params;
        const currentUser = req.user || req.travelCompany;

        if (!currentUser) {
            return res.status(401).json({ message: "Unauthorized: User or Travel Company not logged in." });
        }

        const entry = await Post.findById(id);

        if (!entry) {
            return res.status(404).json({ message: "Entry not found." });
        }

        // Check if user has already liked the post
        // First check in the new likes array structure
        const userLikedEntry = entry.likes.some(like => like.userId && like.userId.toString() === currentUser._id.toString()) ||
                              // Then check in the old likes array for backward compatibility
                              (entry.likeIds && entry.likeIds.includes(currentUser._id));

        if (userLikedEntry) {
            // Remove like from both arrays for consistency
            await Post.updateOne(
                { _id: id }, 
                { 
                    $pull: { 
                        likes: { userId: currentUser._id },
                        likeIds: currentUser._id 
                    } 
                }
            );
            res.status(200).json({ message: "Post unliked successfully." });
        } else {
            // Get user or travel company profile information
            const { _id: userId, profilePic = "", username, companyName, role, name, logo } = currentUser;
            
            // Determine if this is a user or travel company
            const isUser = role === "User" || !companyName;
            
            // Create detailed like object with appropriate fields based on entity type
            const likeObject = {
                userId,
                username: isUser ? username : (companyName || name), // Use appropriate name field
                userProfilePic: isUser ? (profilePic || "") : (logo || ""), // Use appropriate image field
                isCompany: !isUser // Flag to identify company likes
            };
            
            // Add like to both arrays for consistency
            await Post.updateOne(
                { _id: id }, 
                { 
                    $push: { 
                        likes: likeObject,
                        likeIds: userId 
                    } 
                }
            );
            
            res.status(200).json({ 
                message: "Post liked successfully.",
                likeInfo: likeObject // Return the like info for immediate UI update
            });
        }
    } catch (error) {
        console.error("Error in likeUnlikeEntry:", error.message);
        res.status(500).json({ error: error.message });
    }
};

const replyToPost = async (req, res) => {
    try {
        const { text } = req.body;
        const postId = req.params.id;

        // Extract user or travel company details
        const currentEntity = req.user || req.travelCompany;
        const { _id: userId, profilePic = "", username, companyName, role, name, logo } = currentEntity;

        if (!text) {
            return res.status(400).json({ message: "Reply must have text." });
        }

        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({ message: "Post not found." });
        }

        // Determine if this is a user or travel company
        const isUser = role === "User" || !companyName;
        const isAuthor = post.createdBy.toString() === userId.toString();

        const reply = {
            userId,
            text,
            userProfilePic: isUser ? (profilePic || "") : (logo || ""),
            username: isUser ? username : (companyName || name),
            isAuthor,
            isCompany: !isUser, // Flag to identify company comments
            createdAt: new Date()
        };

        post.replies.push(reply);
        await post.save();

        res.status(200).json({ 
            message: "Reply added successfully.", 
            post,
            reply // Return the new reply for immediate UI update
        });
    } catch (error) {
        console.error("Error in replyToPost:", error.message);
        res.status(500).json({ error: error.message });
    }
};

export { createPost, getPost, getPostsByCompany, deletePost, likeunlikepost, replyToPost, getAllPosts };


/*const createPost = async (req,res) => {
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


export {createPost, getPost,deletePost,likeunlikepost, replyToPost};*/