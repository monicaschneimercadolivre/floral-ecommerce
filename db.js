import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const url = process.env.MONGODB_URL;
mongoose.connect(url);


export default mongoose;