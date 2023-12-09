import { Request, Response } from "express";
import Song from "../../models/song.model";
import Genre from "../../models/genre.model";
import Singer from "../../models/singer.model";
import { systemConfig } from "../../config/config";
import { songRoutes } from "../../routes/admin/song.route";

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
        avatar: string,
        audio: string,
        lyrics?: string
    };

    let avatar = "";
    let audio = "";

    if (req.body.avatar) {
        avatar = req.body.avatar[0];
    };

    if (req.body.audio) {
        audio = req.body.audio[0];
    };

    const objectSong: SongInter = {
        title: req.body.title,
        topicId: req.body.topicId,
        singerId: req.body.singerId,
        description: req.body.description,
        status: req.body.status,
        avatar: avatar,
        audio: audio,
        lyrics: req.body.lyrics
    };

    const song = new Song(objectSong);
    await song.save();

    res.redirect(`/${systemConfig.prefixAdmin}/songs`);
};

// [GET] /admin/songs/edit/:id
export const edit = async (req: Request, res: Response): Promise<void> => {
    const songId: string = `${req.params.id}`;
    try {
        const song = await Song.findOne({
            _id: songId,
            deleted: false
        });


        const genres = await Genre.find({
            deleted: false,
            status: "active"
        }).select("title");

        const singers = await Singer.find({
            deleted: false,
            status: "active"
        }).select("fullName");

        res.render(`admin/pages/songs/edit.pug`, {
            pageTitle: `Edit Song`,
            song,
            genres,
            singers
        });

    } catch (error) {
        res.redirect(`/${systemConfig.prefixAdmin}/songs`);
    };
}

// [PATCH] /admin/songs/edit/:id
export const editPatch = async (req: Request, res: Response): Promise<void> => {

    const songId: string = `${req.params.id}`;

    interface SongInter {
        title: string,
        topicId: string,
        singerId: string,
        description?: string,
        status: string,
        avatar?: string,
        audio?: string,
        lyrics?: string
    };

    const songData: SongInter = {
        title: req.body.title,
        topicId: req.body.topicId,
        singerId: req.body.singerId,
        description: req.body.description,
        status: req.body.status,
        lyrics: req.body.lyrics
    };

    if (req.body.avatar) {
        songData["avatar"] = req.body.avatar[0];
    };

    if (req.body.audio) {
        songData["audio"] = req.body.audio[0];
    };

    try {
        await Song.updateOne({
            _id: songId,
        }, songData);

        res.redirect(`/${systemConfig.prefixAdmin}/songs`);

    } catch (error) {
        res.redirect(`/${systemConfig.prefixAdmin}/songs`);
    };

};