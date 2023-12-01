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

// [GET] /songs/detail/:songSlug
export const detail = async (req: Request, res: Response): Promise<void> => {

    const song = await Song.findOne({
        slug: req.params.songSlug,
        status: "active",
        deleted: false
    });

    if(!song) {
        res.redirect(`back`);
        return;
    }

    const singer = await Singer.findOne({
        _id: song.singerId,
        status: "active",
        deleted: false
    }).select("fullName avatar");

    if(!singer) {
        res.redirect(`back`);
        return;
    }

    const genre = await Genre.findOne({
        _id: song.topicId,
        status: "active",
        deleted: false
    }).select("title");

    res.render("client/pages/songs/detail", {
        pageTitle: "Detail | " + song.title,
        song: song,
        singer: singer,
        genre: genre
    });
}
