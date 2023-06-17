import express from "express";
import { registerUser, loginUser, getUserByUsername } from "../controllers/user.js";
const router = express.Router();

router.get("/login", (req,res) => {
    res.send('This works');
});
// http://localhost:5000/
router.post("/login", loginUser);

router.post("/register", registerUser);

router.post("/getUser", getUserByUsername);

export default router;