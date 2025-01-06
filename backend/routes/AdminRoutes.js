
//import  protectRoute  from "../middlewares/AdminProtectedRoute.js";
import express from "express";
import { loginAdmin,LogoutAdmin,getAdminStats } from "../controllers/AdminController.js"

const router = express.Router();

// Route for admin login
router.post('/login', loginAdmin);
router.post('/logout', LogoutAdmin);
router.get('/stats', getAdminStats);

export default router;


