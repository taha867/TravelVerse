import jwt from "jsonwebtoken";
import Admin from "../models/AdminModel.js";

const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt; // Extract token from cookies
        if (!token) {
            return res.status(401).json({ message: "Not authorized, token is required" });
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Use the secret from .env

        // Find the user by ID
        const user = await Admin.findById(decoded.userID).select("-password");
        if (!user) {
            return res.status(404).json({ message: "Admin not found" });
        }

        // Attach the user object to the request
        req.user = user;

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
