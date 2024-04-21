import express from "express";
import bodyParse from "body-parser";
import mongoose from "mongoose";
import cors from "cors"
import dotenv from "dotenv"
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import { userInfo } from "os";
import { error } from "console";
import authRoutes from "./routes/auth.js"
import { register } from "./controllers/auth.js";
import userRoutes from "./routes/users.js"
import postRoutes from "./routes/posts.js"
import { verifyToken } from "./middleware/auth.js";
import{createPost} from "./controllers/posts.js"

//app configs
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}));
app.use(morgan("common"));
app.use(bodyParse.json({limit: "30mb", extended: true}));
app.use(bodyParse.urlencoded({limit: "30mb", extended: true}));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, 'public/assests')));

//how to save files
const storage = multer.diskStorage({
    destination: function(req , file, cb){
        cb(null, "public/assets");
    },
    filename:function(req , file, cb){
            cb(null, file.originalname);
        }
});

const upload = multer({storage});

//auth
app.post("/auth/register", upload.single("picture"), register);
app.post("/posts", verifyToken, upload.single("picture"), createPost)

//routes
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts" , postRoutes)



//Mongo setup
const PORT = process.env.PORT || 6001;
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    app.listen(PORT, () => console.log(`Connected to Server Port: ${PORT}`));
}).catch((error) => console.log(`${error} did not connect`));
