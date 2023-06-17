import express from "express";
import { getUserData, saveChanges, getPrevOrders } from "../controllers/user.js";
import { verifyJwt } from "../middleware/validateUser.js";
const router = express.Router();

router.get("/getUserData", verifyJwt, getUserData);
router.get("/getPrevOrders", verifyJwt, getPrevOrders);
router.post("/saveChanges", verifyJwt, saveChanges);
// http://localhost:5000/



export default router;