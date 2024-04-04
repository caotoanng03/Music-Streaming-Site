import mongoose from "mongoose";
import slug from "mongoose-slug-updater";
mongoose.plugin(slug)

const genreSchema = new mongoose.Schema({
    title: String,
    avatar: String,
    description: String,
    status: String,
    slug: {
        type: String,
        slug: "title",
        unique: true
    },
    deleted: {
        type: Boolean,
        default: false
    },
    deletedAt: Date,
}, { timestamps: true });

const Genre = mongoose.model("Genre", genreSchema, "genres");

export default Genre;