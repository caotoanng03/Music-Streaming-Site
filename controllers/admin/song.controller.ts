import { Request, Response } from "express";
import Song from "../../models/song.model";
import Genre from "../../models/genre.model";
import Singer from "../../models/singer.model";
import { systemConfig } from "../../config/config";
import { title } from "process";

// [GET] /admin/songs
export const index = async (req: Request, res: Response): Promise<void> => {
    if (!res.locals.role.permissions.includes('songs_view')) {
        res.sendStatus(400);
        return;
    }

    const songs = await Song.find({
        deleted: false
    });

    res.render("admin/pages/songs/index", {
        pageTitle: "Song Management",
        songs
    });
};

// [GET] /admin/songs/create
export const create = async (req: Request, res: Response): Promise<void> => {
    if (!res.locals.role.permissions.includes('songs_create')) {
        res.sendStatus(400);
        return;
    }

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
export const createPost = async (req, res: Response): Promise<void> => {
    if (!res.locals.role.permissions.includes('songs_create')) {
        res.sendStatus(400);
        return;
    }

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

    req.flash('success', 'New song was created successfully.');
    res.redirect(`/${systemConfig.prefixAdmin}/songs`);
};

// [GET] /admin/songs/edit/:id
export const edit = async (req: Request, res: Response): Promise<void> => {
    if (!res.locals.role.permissions.includes('songs_edit')) {
        res.sendStatus(400);
        return;
    }

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
        // 404 page
        res.render('errors/404', {
            pageTitle: '404 Not Found'
        });
    };
}

// [PATCH] /admin/songs/edit/:id
export const editPatch = async (req, res: Response): Promise<void> => {
    if (!res.locals.role.permissions.includes('songs_edit')) {
        res.sendStatus(400);
        return;
    }

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

        req.flash('success', 'The song was updated successfully.');
        res.redirect(`/${systemConfig.prefixAdmin}/songs`);

    } catch (error) {
        // 404 page
        res.render('errors/404', {
            pageTitle: '404 Not Found'
        });
    };

};

// [GET] /admin/songs/detail/:id
export const detail = async (req: Request, res: Response): Promise<void> => {
    if (!res.locals.role.permissions.includes('songs_view')) {
        res.sendStatus(400);
        return;
    }

    const songId: string = `${req.params.id}`;

    try {
        const song = await Song.findOne({
            _id: songId,
            deleted: false,
        });

        const singer = await Singer.findOne({
            _id: song.singerId,
            deleted: false,
        }).select('fullName');

        const genre = await Genre.findOne({
            _id: song.topicId,
            deleted: false,
        }).select('title');

        res.render(`admin/pages/songs/detail.pug`, {
            pageTitle: `${song['title']}`,
            song,
            singer,
            genre
        });

    } catch (error) {
        // 404 page
        res.render('errors/404', {
            pageTitle: '404 Not Found'
        });
    }
}

// [DELETE] /admin/songs/delete/:id
export const deleteSong = async (req, res: Response): Promise<void> => {
    if (!res.locals.role.permissions.includes('songs_delete')) {
        res.sendStatus(400);
        return;
    }

    const songId: string = `${req.params.id}`;

    try {
        await Song.updateOne({
            _id: songId
        }, {
            deleted: true
        })

        req.flash('success', 'The song was deleted successfully.');
        res.redirect(`back`);
    } catch (error) {
        // 404 page
        res.render('errors/404', {
            pageTitle: '404 Not Found'
        });
    }
}