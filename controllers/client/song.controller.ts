import { Request, Response } from "express";
import Genre from "../../models/genre.model";
import Song from "../../models/song.model";
import Singer from "../../models/singer.model";

// [GET] /songs/:slugGenre
export const list = async (req: Request, res: Response): Promise<void> => {
    const genre = await Genre.findOne({
        slug: req.params.slugGenre,
        status: "active",
        deleted: false
    });

    if(!genre) {
        res.redirect("/genres");
        return;
    }

    const songs = await Song.find({
        topicId: genre.id,
        status: "active",
        deleted: "false"
    }).select("title avatar singerId like slug");
    
    for (const song of songs) {
        const singerInfo = await Singer.findOne({
            _id: song.singerId,
            status: "active",
            deleted: false
        });

        song["singerInfo"] = singerInfo;
    };

    res.render("client/pages/songs/list", {
        pageTitle: genre.title,
        songs: songs
    });
}
