import Mongoose from "../../db.js";
import { ObjectId } from 'mongodb';

const productSchema = new Mongoose.Schema(
  {
    id:String,
    name: String,
    description: String,
    price: Number,
    stock: Number,
    image: String
  },
  {
    collection: "product",
    timestamps: true,
  }
);

export default Mongoose.model("product", productSchema, "product");