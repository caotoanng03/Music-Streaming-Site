import { Request, Response } from "express";
import Song from "../../models/song.model";
import FavoriteSong from "../../models/favorite-song.model";
import Singer from "../../models/singer.model";

// [GET] /favorite-songs
export const index = async (req: Request, res: Response): Promise<void> => {

    const favoriteSongs = await FavoriteSong.find({
        // userId:
        userId: res.locals.user.id,
        deleted: false
    });

    for (const item of favoriteSongs) {
        const songInfo = await Song.findOne({
            _id: item.songId,
            status: "active",
            deleted: false
        });

        const singerInfo = await Singer.findOne({
            _id: songInfo.singerId,
            status: "active",
            deleted: false
        });

        item["songInfo"] = songInfo;
        item["singerInfo"] = singerInfo;
    }

    res.render("client/pages/favorite-songs/index", {
        pageTitle: "Favorite Songs",
        favoriteSongs
    })
}