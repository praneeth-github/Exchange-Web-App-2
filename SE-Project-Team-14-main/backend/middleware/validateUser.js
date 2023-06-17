import jwt from "jsonwebtoken";

export let verifyJwt = (req,res,next) => {
    const token = req.header("x-access-token");
    if(!token){
        res.status(404).send("Unauthorized");
    } else {
        jwt.verify(token, "jwtSecret", (err, decoded) => {
            if (err){
                res.json({auth: false, msg: "Invalid token"});
            } else{
                req.user = decoded.id;
                next();
            }
        })
    }
}