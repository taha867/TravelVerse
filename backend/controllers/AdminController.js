
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js'; 
import Company from '../models/travelcompanyModel.js'; 


const loginAdmin = async (req, res) => {
    const { username, password } = req.body;
  
    try {
      // Check if the username and password match the environment variables
      if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
        
        // Create JWT token (you can customize the payload as needed)
        const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1h' });
  
        // Respond with a success message and token
        res.status(200).json({
          message: 'Login successful!',
          token,
        });
      } else {
        return res.status(400).json({ error: 'Invalid username or password' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

const LogoutAdmin = async (req, res) => {
    try {
        res.cookie('jwt', '', { maxAge: 1 }); // Clear cookie
        return res.status(200).json({ message: 'Admin logged out successfully!' });
    } catch (err) {
        console.error('Error in logoutAdmin:', err.message);
        res.status(500).json({ error: err.message });
    }
};

const getAdminStats = async (req, res) => {
    try {
      const totalUsers = await User.countDocuments();
      const totalCompanies = await Company.countDocuments();
      const totalApprovals = await Company.countDocuments({ status: "approved" });
  
      // Example growth calculations (replace with real logic)
      const userGrowth = 15; // Example percentage
      const companyGrowth = -8; // Example percentage
      const approvalGrowth = 5; // Example percentage
  
      const today = new Date();
      const startOfDay = new Date(today.setHours(0, 0, 0, 0));
      const endOfDay = new Date(today.setHours(23, 59, 59, 999));
  
      const newUsersToday = await User.countDocuments({ createdAt: { $gte: startOfDay, $lte: endOfDay } });
      const newCompaniesToday = await Company.countDocuments({ createdAt: { $gte: startOfDay, $lte: endOfDay } });
      const pendingApprovals = await Company.countDocuments({ status: "pending" });
  
      res.status(200).json({
        totalUsers,
        userGrowth,
        totalCompanies,
        companyGrowth,
        totalApprovals,
        approvalGrowth,
        newUsersToday,
        newCompaniesToday,
        pendingApprovals,
      });
    } catch (error) {
      console.error("Error fetching admin stats:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };
  const deleteTravelCompany = async (req, res) => {
    const { id } = req.params; // Get the company ID from the request parameters
  
    try {
      // Check if the company exists
      const company = await Company.findById(id);
  
      if (!company) {
        return res.status(404).json({ message: "Travel company not found." });
      }
  
      // Delete the company
      await Company.findByIdAndDelete(id);
  
      res.status(200).json({ message: "Travel company deleted successfully." });
    } catch (error) {
      console.error("Error deleting travel company:", error.message);
      res.status(500).json({ error: "Internal server error." });
    }
  };

  const getAllTravelCompanies = async (req, res) => {
    const { page = 1, limit = 10 } = req.query; // Pagination: Default to page 1, 10 items per page
  
    try {
      // Fetch companies with pagination
      const companies = await Company.find()
        .skip((page - 1) * limit)
        .limit(parseInt(limit));
  
      // Total count of companies
      const totalCompanies = await Company.countDocuments();
  
      res.status(200).json({
        companies,
        totalCompanies,
        totalPages: Math.ceil(totalCompanies / limit),
        currentPage: parseInt(page),
      });
    } catch (error) {
      console.error("Error fetching travel companies:", error.message);
      res.status(500).json({ error: "Internal server error." });
    }
  };
  
  const searchCompanies = async (req, res) => {
    const { query } = req.query;
  
    try {
      // Perform a case-insensitive search for the Companyname
      const companies = await Company.find({
        Companyname: { $regex: query, $options: "i" },
      });
  
      res.status(200).json(companies);
    } catch (error) {
      console.error("Error searching for companies:", error.message);
      res.status(500).json({ error: "Internal server error." });
    }
  };

  // Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error.message);
    res.status(500).json({ error: "Internal server error." });
  }
};

// Search users by name or username
const searchUsers = async (req, res) => {
  const { query } = req.query;

  try {
    // Perform a case-insensitive search for name or username
    const users = await User.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { username: { $regex: query, $options: "i" } },
      ],
    });

    res.status(200).json(users);
  } catch (error) {
    console.error("Error searching users:", error.message);
    res.status(500).json({ error: "Internal server error." });
  }
};

// Delete a user by ID
const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    await User.findByIdAndDelete(id);
    res.status(200).json({ message: "User deleted successfully." });
  } catch (error) {
    console.error("Error deleting user:", error.message);
    res.status(500).json({ error: "Internal server error." });
  }
};
  
export {loginAdmin,  LogoutAdmin , getAdminStats, deleteTravelCompany,  getAllTravelCompanies, searchCompanies, getAllUsers, searchUsers, deleteUser };
