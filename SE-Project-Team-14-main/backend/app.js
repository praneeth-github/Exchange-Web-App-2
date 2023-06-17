import dotenv from "dotenv";
import mongoose from "mongoose";
import express from "express"
import cors from "cors"
import productRoutes from "./routes/product.js"
import userRoutes from "./routes/profile.js";
import authRoutes from "./routes/auth.js"
import uploadRoutes from "./routes/uploadItem.js"
import discussionRoute from "./routes/discussionRoute.js" 
import chatRoutes from "./routes/chats.js";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import session from "express-session";
import ejs from "ejs";

dotenv.config();
const app = express();
app.use(
    cors({
        origin: ["http://localhost:3000"],
        methods: ["GET", "POST"],
        credentials: true,
    })
);
//app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
    session({
        key: "user",
        secret: process.env.SECRET,
        resave: false,
        saveUninitialized: false,
    })
);

mongoose.connect(
    process.env.DB_URI,
    {
        useNewUrlParser:true,
        useUnifiedTopology: true,
    }
).then(console.log('Database connected')).catch((err)=>console.log(err));

const port = process.env.PORT || 5000;
app.listen(port,()=>{
    console.log('Server listening at port 5000');
})

app.use("/profile", userRoutes);
app.use("/products", productRoutes);
app.use("/sell", uploadRoutes);
app.use("/discussion",discussionRoute);
app.use("/", authRoutes);
app.use("/chat", chatRoutes);

app.get("/",(req,res)=>{
    res.send('Working!!');
});


app.use("*", (req,res) =>{
    return res.status(404).json({error: "not found"});
});












