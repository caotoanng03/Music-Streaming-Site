import { Request, Response } from "express";
import Song from "../../models/song.model";

// [GET] /admin/songs/index
export const index = async (req: Request, res: Response): Promise<void> => {
    const songs = await Song.find({
        deleted: false
    });

    res.render("admin/pages/songs/index", {
        pageTitle: "Admin | Song",
        songs
    });
};