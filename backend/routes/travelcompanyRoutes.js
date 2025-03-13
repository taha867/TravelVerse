import express from "express";
import { SignupTravelCompany, ApproveTravelCompany, SetPassword, sendemail, LoginTravelCompany, Logout, updateTravelcompany, getCompanyProfile,getTravelCompaniesByStatus } from "../controllers/travelcompanyController.js";
import protectRoute from "../middlewares/TravelcompanyprotectRoute.js";

const router = express.Router();

router.post("/signup", SignupTravelCompany); // Initial signup
router.patch("/approve/:companyId", ApproveTravelCompany); // Admin approval
router.post("/set-password/:companyId", SetPassword); // Password setup
router.post("/send-email", sendemail)
router.post("/login", LoginTravelCompany);
router.post("/logout", Logout);
router.put("/update/:id",protectRoute, updateTravelcompany);
router.get("/profile/:Companyname", getCompanyProfile);
router.get("/",getTravelCompaniesByStatus);
export default router;
