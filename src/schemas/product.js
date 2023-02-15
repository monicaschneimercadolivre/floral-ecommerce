import mongoose from "mongoose";
const Schema = mongoose.Schema
import { ObjectId } from 'mongodb';

const productSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        stock: {
            type: Number,
            required: true
        },
        image: {
            type: Schema.Types.ObjectId,
            required: true
        },
    },
    {
        collection: "product2",
        timestamps: true,
    }
);

export default mongoose.model("product2", productSchema, "product2");