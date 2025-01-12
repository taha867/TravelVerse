import express from "express";
import { GetTours, createNewTour} from "../controllers/tourController.js"
import protectroutes from "../middlewares/TravelcompanyprotectRoute.js";
const router = express.Router();


router.get('/', GetTours);
router.post('/create', protectroutes, createNewTour);
console.log("Tour routes loaded"); 
export default router;


