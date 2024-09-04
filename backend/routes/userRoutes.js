import express from "express";

const router = express.Router();

router.get("/signup",(req,res) => {
res.send("signed up successfully")
});

export default router;