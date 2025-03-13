import jwt from "jsonwebtoken";

const protectRoute = async (req, res, next) => {
    let token = req.headers.authorization?.split(" ")[1];
    console.log("Received token:", token);


    if (!token) {
      return res.status(401).json({ message: "Unauthorized: No token provided." });
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("Decoded token:", decoded);  // debug
      
      if (decoded.username === process.env.ADMIN_USERNAME) {
        req.admin = decoded;
        next();
      } else {
        return res.status(403).json({ message: "Forbidden: Admin access only." });
      }
    } catch (error) {
      console.error("Invalid token:", error.message);
      return res.status(401).json({ message: "Unauthorized: Invalid token." });
    }
};

export default protectRoute;
