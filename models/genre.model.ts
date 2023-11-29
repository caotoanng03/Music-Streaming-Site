import mongoose from "mongoose";

const genreSchema = new mongoose.Schema({
    title: String,
    avatar: String,
    description: String,
    status: String,
    slug: String,
    deleted: {
        type: Boolean,
        default: false
    },
    deletedAt: Date,
}, {timestamps: true});

const Genre = mongoose.model("Genre", genreSchema, "genres");

export default Genre;