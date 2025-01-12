//
//import  protectRoute  from "../middlewares/AdminProtectedRoute.js";
import express from "express";
import { loginAdmin,LogoutAdmin,getAdminStats,deleteTravelCompany, getAllTravelCompanies, searchCompanies,getAllUsers,searchUsers,deleteUser } from "../controllers/AdminController.js"

const router = express.Router();

// Route for admin login
router.post('/login', loginAdmin);
router.post('/logout', LogoutAdmin);
router.get('/stats', getAdminStats);
router.delete("/deletecompany/:id", deleteTravelCompany);
router.get("/Allcompanies", getAllTravelCompanies);
router.get("/Searchcompanies/search", searchCompanies);
router.get("/users", getAllUsers);
router.get("/users/search",  searchUsers);
router.delete("/users/:id",  deleteUser);
export default router;


