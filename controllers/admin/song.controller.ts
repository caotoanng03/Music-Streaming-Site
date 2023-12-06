import { Request, Response } from "express";
import Song from "../../models/song.model";
import Genre from "../../models/genre.model";
import Singer from "../../models/singer.model";

// [GET] /admin/songs/index
export const index = async (req: Request, res: Response): Promise<void> => {
    const songs = await Song.find({
        deleted: false
    });

    res.render("admin/pages/songs/index", {
        pageTitle: "Song",
        songs
    });
};

// [GET] /admin/songs/create
export const create = async (req: Request, res: Response): Promise<void> => {
    const genres = await Genre.find({
        deleted: false,
        status: "active"
    }).select("title");

    const singers = await Singer.find({
        deleted: false,
        status: "active"
    }).select("fullName");

    res.render("admin/pages/songs/create", {
        pageTitle: "New Song",
        genres,
        singers
    });
};