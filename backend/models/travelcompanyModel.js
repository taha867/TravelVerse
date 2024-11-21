import mongoose from "mongoose";

const travelcompanySchema = mongoose.Schema(
    {
        company:{
            type: 'string',
            required: true,
        },
        Companyname: {
          type: 'string',
          required: true,
          unique: true,
          match: [
            /^[^\s]+$/, // Regular expression to disallow spaces
            "Companyname should not contain spaces",
          ],
        },
      email: {
        type: 'string',
        required: true,
        unique: true,
      },
      instagramUrl: {
        type: 'string',
        required: true,
        match: [
          /^(https?:\/\/)?(www\.)?instagram\.com\/[a-zA-Z0-9_.-]+\/?$/,
          "Please enter a valid Instagram URL",
        ],
      },
      password: {
        type: 'string',
        minLength: 6,
      },
      status: {
        type: 'string',
        enum: ["pending", "approved", "active"],
        default: "pending",
      },
      profilePic:{
        type:'string',
        default:"",
    },
    },
    {
      timestamps: true,
    }
  );
  
  const TravelCompany = mongoose.model("TravelCompany", travelcompanySchema);
  
  export default TravelCompany;
  