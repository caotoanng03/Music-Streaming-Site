import { Request, Response } from "express";
import Song from "../../models/song.model";
import Genre from "../../models/genre.model";
import Singer from "../../models/singer.model";
import { systemConfig } from "../../config/config";

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

// [POST] /admin/songs/create
export const createPost = async (req: Request, res: Response): Promise<void> => {
    interface SongInter {
        title: string,
        topicId: string,
        singerId: string,
        description?: string,
        status: string,
        avatar: string
    };

    const objectSong: SongInter = {
        title: req.body.title,
        topicId: req.body.topicId,
        singerId: req.body.singerId,
        description: req.body.description,
        status: req.body.status,
        avatar: req.body.avatar
    };

    const song = new Song(objectSong);
    await song.save();

    res.redirect(`/${systemConfig.prefixAdmin}/songs`);
};