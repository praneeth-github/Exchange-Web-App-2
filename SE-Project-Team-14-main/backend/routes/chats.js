import express from "express";
import { verifyJwt } from "../middleware/validateUser.js";
import { createChat, getChatList, addChats, getMessagesFromDB, provideDiscount, createCoupon } from "../controllers/chat.js";
const router = express.Router();


// http://localhost:5000/chat
router.post("/createChat", verifyJwt, createChat);
router.post("/addChats",  addChats);
router.get("/getChatList", verifyJwt, getChatList);
router.get("/getMessagesFromDB", verifyJwt, getMessagesFromDB);
router.get("/provideDiscount", verifyJwt, provideDiscount);
router.post("/createCoupon", verifyJwt, createCoupon);

export default router;