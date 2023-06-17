import express from "express";
import { addToCart, viewCart, getProductDetails, getProductData, 
    getRequestDetails, getRequestProduct, makeRequest, chooseDecision, 
    getOwnItems, checkCart, cancelOrder, orderSuccess, generatePDF, viewPDF, saveProductChanges } from "../controllers/product.js";
import { verifyJwt } from "../middleware/validateUser.js";
const router = express.Router();

// http://localhost:5000/products/

router.get("/", (req,res) => {
    res.send('This works');
});

//let token = localStorage.getItem("token");

router.get("/viewCart", verifyJwt, viewCart);
router.post("/addToCart", verifyJwt, addToCart);

router.get("/getProducts", getProductDetails);

router.get("/getProductData", getProductData);
router.get("/getRequests", verifyJwt, getRequestDetails);
router.get("/getRequestProduct", verifyJwt, getRequestProduct);
router.post("/makeRequest", verifyJwt, makeRequest);
router.post("/chooseDecision", verifyJwt, chooseDecision);
router.get("/getOwnItems", verifyJwt, getOwnItems);
router.get("/checkCart", verifyJwt, checkCart);
router.post("/cancelOrder", verifyJwt, cancelOrder);
router.post("/orderSuccess", verifyJwt, orderSuccess);
router.post("/generatePDF", verifyJwt, generatePDF);
router.get("/viewPDF", verifyJwt, viewPDF);
router.post("/saveProductChanges", verifyJwt, saveProductChanges);






export default router;