import TravelCompany from "../models/travelcompanyModel.js";
import bcrypt from "bcryptjs";
import genrateTokenAndSetCookie from "../utils/helpers/genrateTokenAndSetCookie.js";
import sendEmail from "../utils/helpers/emailHelper.js";

const SignupTravelCompany = async (req, res) => {
    try {
        const { company,email, Companyname, instagramUrl } = req.body;

        // Check if travel company already exists
        const existingCompany = await TravelCompany.findOne({ $or: [{ email }, { Companyname }] });
        if (existingCompany) {
            return res.status(400).json({ message: "Travel company already exists" });
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

        return res.status(201).json({
            message: "Signup request submitted successfully. Await admin approval.",
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
        console.log("Error in SignupTravelCompany: ", error.message);
    }
};



const ApproveTravelCompany = async (req, res) => {
    try {
        const { companyId } = req.params;

        const travelCompany = await TravelCompany.findById(companyId);

        if (!travelCompany) {
            return res.status(404).json({ message: "Travel company not found" });
        }
        

        // Mark as approved
        travelCompany.status = "approved";
        await travelCompany.save();

        // Generate a password setup link
        const passwordSetupLink = `${process.env.APP_URL}/set-password?companyId=${travelCompany._id}`;

        // Send email with the link
        await sendEmail({
            to: travelCompany.email,
            subject: "Password Setup for Travel Verse",
            text: `Hello ${travelCompany.Company},\n\nYour account has been approved. Please set your password using the following link:\n${passwordSetupLink}\n\nThank you!`,
            html: `
                <p>Hello ${travelCompany.Companyname},</p>
                <p>Your account has been approved. Please set your password using the link below:</p>
                <a href="${passwordSetupLink}" target="_blank">Set Password</a>
                <p>Thank you!</p>
            `,
        });

        return res.status(200).json({ message: "Travel company approved and email sent successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
        console.log("Error in ApproveTravelCompany: ", error.message);
    }
};



const SetPassword = async (req, res) => {
    try {
        const { companyId, password } = req.body;

        const travelCompany = await TravelCompany.findById(companyId);

        if (!travelCompany || travelCompany.status !== "approved") {
            return res.status(400).json({ message: "Invalid or unapproved travel company" });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        travelCompany.password = await bcrypt.hash(password, salt);
        travelCompany.status = "active"; // Mark as active
        await travelCompany.save();

        genrateTokenAndSetCookie(travelCompany._id, res);

        return res.status(200).json({
            message: "Password set successfully",
            _id: travelCompany._id,
            email: travelCompany.email,
            Companyname: travelCompany.Companyname,
            company: travelCompany.Company
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
        console.log("Error in SetPassword: ", error.message);
    }
};

const LoginTravelCompany = async (req, res) => {
    try {
        const { email, password } = req.body;

        const travelCompany = await TravelCompany.findOne({ email });

        if (!travelCompany) {
            return res.status(404).json({ message: "Travel company not found" });
        }

        // Check if the account is active
        if (travelCompany.status !== "active") {
            return res.status(400).json({ message: "Account is not active. Please complete the signup process." });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, travelCompany.password);

        if (!isMatch) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        // Generate token and set cookie
        genrateTokenAndSetCookie(travelCompany._id, res);

        return res.status(200).json({
            message: "Login successful",
            _id: travelCompany._id,
            email: travelCompany.email,
            Companyname: travelCompany.Companyname,
            company: travelCompany.company
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
        console.error("Error in LoginTravelCompany: ", error.message);
    }
};

const sendemail = async (req, res) => {
    const { to, subject, text, html } = req.body;

    try {
        await sendEmail({ to, subject, text, html });
        res.status(200).json({ message: "Email sent successfully!" });
    } catch (error) {
        res.status(500).json({ message: error.message });
        console.error("Error sending email: ", error.message);
    }
}

const Logout = async (req, res) => {
    try {
        res.cookie('jwt', '', { maxAge: 1 }); // Clear cookie
        return res.status(200).json({ message: 'Travel Company logged out successfully!' });
    } catch (error) {
        console.error('Error in logoutUser:', error.message);
        res.status(500).json({ message: error.message });
    }
};
const updateTravelcompany = async (req, res) => {

    const {company,Companyname,email, instagramUrl, password,status, profilepic} = req.body;
    const userId = req.user._id;
    try {
        let user = await TravelCompany.findById(userId);
        if (!user) return res.status(404).json({ message: 'Travel Company not found' });


        if(req.params.id !== userId.toString()) return res.status(404).json({ message: "You can not update other users profile"});


        if(password){
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            user.password = hashedPassword;
        }

        user.company= company || user.company;
        user.Companyname= Companyname || user.Companyname;
        user.email= email || user.email;
        user.instagramUrl= instagramUrl || user.instagramUrl;
        user.profilePic= profilepic || user.profilePic;
        user.status= status || user.status;

        user = await user.save();

        res.status(200).json({ message: "Profile updated successfully", user });

    } catch (error) {
        res.status(500).json({ message: error.message });
        console.log('Error in updateUser:', error.message);
    }
} ;
const getCompanyProfile = async (req, res) => {
    const { Companyname } = req.params;
    console.log("Received Companyname:", Companyname);

    try {
      // Find the company and exclude 'password' and 'updatedAt'
      const company = await TravelCompany.findOne({ Companyname }).select("-password -updatedAt");

      if (!company)
        return res.status(404).json({ message: "Travel Company not found" });
  
      res.status(200).json(company);
    } catch (error) {
      res.status(500).json({ message: error.message });
      console.log("Error in getCompanyProfile:", error.message);
    }
  };
  


export { SignupTravelCompany, ApproveTravelCompany, SetPassword, LoginTravelCompany, sendemail, Logout,updateTravelcompany,getCompanyProfile };
