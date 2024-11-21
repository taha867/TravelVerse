import User from "../models/userModel.js"
import bcrypt from "bcryptjs";
import genrateTokenAndSetCookie from "../utils/helpers/genrateTokenAndSetCookie.js";

const SignupUser = async (req, res) => {
    try {
        const { name, email, username, password } = req.body;

        // Check if user already exists
        const user = await User.findOne({ $or: [{ email }, { username }] });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        // Create a new user
        const newUser = new User({
            name,
            email,
            username,
            password: hashPassword
        });

        await newUser.save();

        // Generate token and send response
        if (newUser) {
            genrateTokenAndSetCookie(newUser._id, res);
            return res.status(201).json({
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                username: newUser.username
            });
        } else {
            return res.status(400).json({ message: "Invalid user data" });
        }

    } catch (error) {
        res.status(500).json({ message: error.message });
        console.log("Error in SignupUser: ", error.message);
    }
};

const loginUser = async (req, res) => {
    try {
        const{username,password}= req.body;
        const user = await User.findOne({username});
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "") ;//if username doesnot exist it will compare with " "

        if(!user || !isPasswordCorrect)
            return res.status(400).json({message: "Invalid Username or Password"});

        genrateTokenAndSetCookie(user._id,res);

        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            username: user.username

        })


    } catch (error) {
        res.status(500  ).json({message: error.message});
        console.log("Error in loginUser: ",error.message);
    }
};

const LogoutUser = async (req, res) => {
    try {
        res.cookie('jwt', '', { maxAge: 1 }); // Clear cookie
        return res.status(200).json({ message: 'User logged out successfully!' });
    } catch (error) {
        console.error('Error in logoutUser:', error.message);
        res.status(500).json({ message: error.message });
    }
};

const updateUser = async (req, res) => {

    const {name, username,email, password, profilepic} = req.body;
    const userId = req.user._id;
    try {
        let user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: 'User not found' });

        if(req.params.id !== userId.toString()) return res.status(404).json({ message: "You can not update other users profile"});


        if(password){
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            user.password = hashedPassword;
        }

        user.name= name || user.name;
        user.email= email || user.email;
        user.username= username || user.username;
        user.profilePic= profilepic || user.profilePic;

        user = await user.save();

        res.status(200).json({ message: "Profile updated successfully", user });

    } catch (error) {
        res.status(500).json({ message: error.message });
        console.log('Error in updateUser:', error.message);
    }
} ;
const getUserProfile = async (req, res) => {
    const { username } = req.params;
    console.log(`Received request for user: ${username}`); // Debugging line
    try {
        const user = await User.findOne({ username }).select("-password -updatedAt");
        if (!user) return res.status(404).json({ message: "User not found" });

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
        console.log('Error in getUserProfile:', error.message);
    }
};



export {SignupUser, loginUser, LogoutUser,updateUser, getUserProfile};