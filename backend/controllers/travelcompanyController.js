import TravelCompany from "../models/travelcompanyModel.js";
import bcrypt from "bcryptjs";
import genrateTokenAndSetCookie from "../utils/helpers/genrateTokenAndSetCookie.js";
import sendEmail from "../utils/helpers/emailHelper.js";
import { v2 as cloudinary } from "cloudinary";

const SignupTravelCompany = async (req, res) => {
    try {
        const { company,email, Companyname, instagramUrl } = req.body;

        // Check if travel company already exists
        const existingCompany = await TravelCompany.findOne({ $or: [{ email }, { Companyname }] });
        if (existingCompany) {
            return res.status(400).json({ error: "Travel company already exists" });
        }

        // Save travel company as pending
        const newTravelCompany = new TravelCompany({
            company,
            email,
            Companyname,
            instagramUrl,
            status: "pending", // Mark as pending for admin approval
        });

        await newTravelCompany.save();

        if (newTravelCompany) {
            genrateTokenAndSetCookie(newTravelCompany._id, res);
            return res.status(201).json({
                _id: newTravelCompany._id,
                company: newTravelCompany.company,
                email: newTravelCompany.email,
                Companyname: newTravelCompany.Companyname,
                profilePic: newTravelCompany.profilePic
            });
        } else {
            return res.status(400).json({ message: "Invalid Company data" });
        }

    } catch (err) {
        res.status(500).json({ error: err.message });
        console.log("Error in SignupTravelCompany: ", err.message);
    }
};



const ApproveTravelCompany = async (req, res) => {
    try {
        const { companyId } = req.params;

        const travelCompany = await TravelCompany.findById(companyId);

        if (!travelCompany) {
            return res.status(404).json({ error: "Travel company not found" });
        }
        
        // Mark as approved
        travelCompany.status = "approved";
        await travelCompany.save();

        // Generate a password setup link
        const passwordSetupLink = `${process.env.APP_URL}/setpassword/${travelCompany._id}`;

        // Send email with the link
        await sendEmail({
            to: travelCompany.email,
            subject: "Password Setup for Travel Verse",
            text: `Hello ${travelCompany.Companyname},\n\nYour account has been approved. Please set your password using the following link:\n${passwordSetupLink}\n\nThank you!`,
            html: `
                <p>Hello ${travelCompany.Companyname},</p>
                <p>Your account has been approved. Please set your password using the link below:</p>
                <a href="${passwordSetupLink}" target="_blank">Set Password</a>
                <p>Thank you!</p>
            `,
        });

        return res.status(200).json({ message: "Travel company approved and email sent successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
        console.log("Error in ApproveTravelCompany: ", err.message);
    }
};




const SetPassword = async (req, res) => {
    try {
      // Extract companyId from URL parameters and password from the body
      const { companyId } = req.params;
      const { password } = req.body;
  
      console.log(`Setting password for company ID: ${companyId}`);
  
      // Find the travel company in the database
      const travelCompany = await TravelCompany.findById(companyId);
  
      // Validate if the company exists and has been approved
      if (!travelCompany || travelCompany.status !== "approved") {
        return res.status(400).json({ error: "Invalid or unapproved travel company" });
      }
  
      // Hash the password
      const salt = await bcrypt.genSalt(10);
      travelCompany.password = await bcrypt.hash(password, salt);
  
      // Set the company status to "active" after the password is set
      travelCompany.status = "active"; // Ensure the company is marked as active
  
      // Save the updated travel company document
      await travelCompany.save();
  
      // Optionally generate a token (if your application requires it) and set it as a cookie
      genrateTokenAndSetCookie(travelCompany._id, res);
  
      // Respond with the success message and company details
      return res.status(200).json({
        message: "Password set successfully",
        _id: travelCompany._id,
        email: travelCompany.email,
        Companyname: travelCompany.Companyname,
        company: travelCompany.company
      });
  
    } catch (err) {
      // In case of error, send a 500 response with the error message
      res.status(500).json({ error: err.message });
      console.log("Error in SetPassword: ", err.message);
    }
  };
  
  
const LoginTravelCompany = async (req, res) => {
    try {
        const { email, password } = req.body;

        const travelCompany = await TravelCompany.findOne({ email });

        if (!travelCompany) {
            return res.status(404).json({ error: "Travel company not found" });
        }

        // Check if the account is active
        if (travelCompany.status !== "active") {
            return res.status(400).json({ error: "Account is not active. Please complete the signup process." });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, travelCompany.password);

        if (!isMatch) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        // Generate token and set cookie
        genrateTokenAndSetCookie(travelCompany._id, res);

        return res.status(200).json({
            message: "Login successful",
            _id: travelCompany._id,
            email: travelCompany.email,
            Companyname: travelCompany.Companyname,
            company: travelCompany.company,
            profilePic: travelCompany.profilePic
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
        console.error("Error in LoginTravelCompany: ", err.message);
    }
};

const sendemail = async (req, res) => {
    const { to, subject, text, html } = req.body;

    try {
        await sendEmail({ to, subject, text, html });
        res.status(200).json({ error: "Email sent successfully!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
        console.error("Error sending email: ", err.message);
    }
}

const Logout = async (req, res) => {
    try {
        res.cookie('jwt', '', { maxAge: 1 }); // Clear cookie
        return res.status(200).json({ message: 'Travel Company logged out successfully!' });
    } catch (err) {
        console.error('Error in logoutUser:', err.message);
        res.status(500).json({ error: err.message });
    }
};
const updateTravelcompany = async (req, res) => {

    const {company,email, instagramUrl, password,status} = req.body;
    let {profilePic} = req.body;
    const userId = req.user._id;
    try {
        let user = await TravelCompany.findById(userId);
        if (!user) return res.status(404).json({ error: 'Travel Company not found' });

        
        if(req.params.id !== userId.toString()) return res.status(404).json({ error: "You can not update other Company profile"});


        if(password){
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            user.password = hashedPassword;
        }


        if (profilePic) {
			if (user.profilePic) {
				await cloudinary.uploader.destroy(user.profilePic.split("/").pop().split(".")[0]);
			}

			const uploadedResponse = await cloudinary.uploader.upload(profilePic);
			profilePic = uploadedResponse.secure_url;
		}

        user.company= company || user.company;
        user.email= email || user.email;
        user.instagramUrl= instagramUrl || user.instagramUrl;
        user.profilePic= profilePic || user.profilePic;
        user.status= status || user.status;

        user = await user.save();

        res.status(200).json({ message: "Profile updated successfully", user });

    } catch (err) {
        res.status(500).json({ error: err.message });
        console.log('Error in updateUser:', err.message);
    }
} ;
const getCompanyProfile = async (req, res) => {
    const { Companyname } = req.params;
    console.log("Received Companyname:", Companyname);

    try {
      // Find the company and exclude 'password' and 'updatedAt'
      const company = await TravelCompany.findOne({ Companyname }).select("-password -updatedAt");

      if (!company)
        return res.status(404).json({ error: "Travel Company not found" });
  
      res.status(200).json(company);
    } catch (err) {
      res.status(500).json({ error: err.message });
      console.log("Error in getCompanyProfile:", err.message);
    }
  };
  
  const getTravelCompaniesByStatus = async (req, res) => {
    try {
      const { status } = req.query; // Extract the status query parameter
  
      if (!status) {
        return res.status(400).json({ error: "Status query parameter is required." });
      }
  
      // Fetch travel companies with the given status
      const companies = await TravelCompany.find({ status });
  
      if (!companies.length) {
        return res.status(404).json({ error: "No travel companies found with the specified status." });
      }
  
      res.status(200).json(companies); // Send the list of companies as a response
    } catch (error) {
      console.error("Error fetching travel companies:", error);
      res.status(500).json({ error: "Internal server error." });
    }
  };


export { SignupTravelCompany, ApproveTravelCompany, SetPassword, LoginTravelCompany, sendemail, Logout,updateTravelcompany,getCompanyProfile, getTravelCompaniesByStatus };
