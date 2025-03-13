import mongoose from "mongoose";

const AdminSchema = mongoose.Schema({

    username:{
        type:'string',
        required: true,
    },
    password:{
        type:'string',
        minLegth:6,
        required: true,
    },
    
},{
    timestamps:true,
})

const Admin = mongoose.model("Admin", AdminSchema);

export default Admin;