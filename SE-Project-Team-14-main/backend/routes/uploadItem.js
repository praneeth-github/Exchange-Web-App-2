import express from "express";
import {uploadItem} from "../controllers/uploadItem.js";
import multer from "multer";
import { verifyJwt } from "../middleware/validateUser.js";

const imageStorage = multer.diskStorage({
    destination: '../frontend/public/Assets/Images',
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const imageFileFilter = (req, file, cb) => {
    if(!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
        return cb(new Error('You can upload only image files!'), false);
    }
    cb(null, true);
};

const imageUpload = multer({
    storage: imageStorage,
    limits: 10000000,
    fileFilter: imageFileFilter,
});

const router = express.Router();

router.post("/", verifyJwt ,uploadItem);
router.post("/imageupload", imageUpload.array('images', 10), (req, res) => {
    console.log(req.files);
    
 }, (error, req, res, next) => {
   // console.log(req.files);
    res.status(400).send({ error: error.message });
 });

export default router;