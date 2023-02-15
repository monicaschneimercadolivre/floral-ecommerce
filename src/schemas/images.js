import mongoose from "mongoose";
const Schema = mongoose.Schema
import { ObjectId } from 'mongodb';

const imageSchema = new Schema(
    {
        fieldname: {
            type: String,
            required: true
        },
        originalname: {
            type: String,
            required: true
        },
        // encoding: {
        //     type: String,
        //     required: true
        // },
        // mimetype: {
        //     type: String,
        //     required: true
        // },
        // destination: {
        //     type: String,
        //     required: true
        // },
        filename: {
            type: String,
            required: true
        },
        path: {
            type: String,
            required: true
        },
        // size: {
        //     type: String,
        //     required: true
        // }
    },
    {
        collection: "image",
        timestamps: true,
    }
);

export default mongoose.model("image", imageSchema, "image");