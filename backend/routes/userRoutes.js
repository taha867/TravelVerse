import express from "express";
import { SignupUser, loginUser, LogoutUser,updateUser, getUserProfile} from "../controllers/userController.js";
import protectRoute from "../middlewares/UserprotectRoute.js";
const router = express.Router();

router.get("/profile/:username", getUserProfile);
router.post("/signup",SignupUser);
router.post("/login",loginUser);
router.post("/logout",LogoutUser);
router.put("/update/:id",protectRoute, updateUser);


export default router;