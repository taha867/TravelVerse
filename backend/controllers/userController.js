import User from "../models/userModel.js"
import bcrypt from "bcryptjs";

const SignupUser = async(req,res) =>{
try {
    const{name,email,username,password}= req.nody;
    const user = await user.findOne({$or:[{email},{username}]});

    if(user){
        res.status(400).json({message:"USer already exists"});
    }

    const salt = await bcrypt.gensSalt(10);//hash the password
    const hashPassword = await bcrypt.hash(password,salt)

    const newUser = new User ({
        name,
        email,
        username,
        password : hashPassword

    })

    await newUser.save();

    if(newUser){
        res.status(201).json({
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            username: newUser.username

        })
    }else{
        res.status(400).json({message: "Invalid user data"});
    }

} catch (error) {
    res.status(500).json({message: error.message})
    console.log("Error in signupUser: ",error.message)
}
}

export {SignupUser};