import express from "express";
import { GetTours } from "../controllers/tourController.js"

const router = express.Router();


router.get('/', GetTours);

export default router;


