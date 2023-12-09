import { Request, Response } from "express";
import Song from "../../models/song.model";

// [GET] /
export const index = async (req: Request, res: Response): Promise<void> => {

    const songs = await Song.find({
        deleted: false,
        status: "active"
    });

    res.render("client/pages/home/index", {
        pageTitle: "Home",
        songs
    });
}