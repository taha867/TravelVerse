import TravelCompany from "../models/travelcompanyModel.js";

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

        if(company._id.toString() !== req.company._id.toString()) {
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
        req.status(500).json({error: error.message});
        console.log("Error in createPost: ", error.message);
    }
};

export {createPost};