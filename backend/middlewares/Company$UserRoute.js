import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import TravelCompany from "../models/travelcompanyModel.js";

const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt; // Extract token from cookies
        if (!token) {
            return res.status(401).json({ message: "Not authorized, token is required" });
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Check if the token belongs to a User or a TravelCompany
        let user = await User.findById(decoded.userID).select("-password");
        let travelCompany = null;

        if (!user) {
            travelCompany = await TravelCompany.findById(decoded.userID).select("-password");
        }

        if (!user && !travelCompany) {
            return res.status(404).json({ message: "User or Travel Company not found" });
        }

        // Attach the current entity and role to the request
        req.user = user || travelCompany;
        req.user.role = user ? "User" : "TravelCompany";

        next(); // Continue to the next middleware or route handler
    } catch (error) {
        console.error("Error in protectRoute:", error.message);
        if (error.name === "JsonWebTokenError") {
            return res.status(401).json({ message: "Invalid token" });
        } else if (error.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Token expired" });
        }
        res.status(500).json({ message: "Server error" });
    }
};

export default protectRoute;
