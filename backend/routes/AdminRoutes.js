//
import  protectRoute  from "../middlewares/AdminProtectedRoute.js";
import express from "express";
import { loginAdmin,LogoutAdmin,getAdminStats,deleteTravelCompany, getAllTravelCompanies, searchCompanies,getAllUsers,searchUsers,deleteUser } from "../controllers/AdminController.js"

const router = express.Router();

// Route for admin login
router.post('/login', loginAdmin);
router.post('/logout',protectRoute, LogoutAdmin);
router.get('/stats',protectRoute, getAdminStats);
router.delete("/deletecompany/:id",protectRoute, deleteTravelCompany);
router.get("/Allcompanies",protectRoute, getAllTravelCompanies);
router.get("/Searchcompanies/search",protectRoute, searchCompanies);
router.get("/users",protectRoute, getAllUsers);
router.get("/users/search",protectRoute,  searchUsers);
router.delete("/users/:id",protectRoute,  deleteUser);
export default router;


