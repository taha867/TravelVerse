import mongoose from "mongoose";

const userSchema = mongoose.Schema({

    name:{
        type: 'string',
        required: true,
    },
    username:{
        type:'string',
        required: true,
        unique: true,
    },
    email:{
        type:'string',
        required: true,
        unique: true,
    },
    password:{
        type:'string',
        minLegth:6,
        required: true,
    },
    profilePic:{
        type:'string',
        default:"",
    },
    followers:{
        type:[String],
        default:[],
    },
    following:{
        type:[String],
        default:[],
    },
    bio:{
        type:'string',
        default:"",
    }

},{
    timestamps:true,
})

const User = mongoose.model("User", userSchema);

export default User;