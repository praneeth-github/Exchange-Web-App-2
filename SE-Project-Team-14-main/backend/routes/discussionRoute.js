import express from "express";
import { verifyJwt } from "../middleware/validateUser.js";
const router = express.Router();
import {
  addComment,
  viewDiscussion,
  addPost,
} from "../controllers/Discussion.js";


router.get("/view", viewDiscussion);
router.post("/addComment", verifyJwt, addComment);
router.post("/addPost", verifyJwt, addPost);

export default router;