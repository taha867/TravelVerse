import express from "express";
import {createPost, deletePost, getPost, likeunlikepost,replyToPost,getPostsByCompany,getAllPosts} from "../controllers/postController.js";
import protectRoute from "../middlewares/TravelcompanyprotectRoute.js";
import protectBothRoutes from "../middlewares/Company$UserRoute.js"

const router = express.Router();

router.post("/create",protectRoute,createPost);
router.get("/:id",getPost);
router.get("/", getAllPosts);
router.get("/company/:companyId/posts",protectRoute, getPostsByCompany);
router.delete("/:id",protectRoute,deletePost);
router.post("/like/:id",protectBothRoutes,likeunlikepost);
router.post("/reply/:id",protectBothRoutes,replyToPost);

export default router;