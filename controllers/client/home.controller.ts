import { Request, Response } from "express";
import Song from "../../models/song.model";
import Singer from "../../models/singer.model";

// [GET] /
export const index = async (req: Request, res: Response): Promise<void> => {

    const songs = await Song.find({
        deleted: false,
        status: "active"
    });

    for (const song of songs) {
        const singerInfo = await Singer.findOne({
            _id: song.singerId,
            deleted: false
        }).select('fullName avatar');

        if (singerInfo) {
            song['singerInfo'] = singerInfo;
        }
    }

    res.render("client/pages/home/index", {
        pageTitle: "Home",
        songs
    });
}