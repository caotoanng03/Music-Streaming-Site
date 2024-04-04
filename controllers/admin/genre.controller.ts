import { Request, Response } from "express";

import Genre from "../../models/genre.model";
import { systemConfig } from "../../config/config";
import { stringify } from "querystring";
import Song from "../../models/song.model";

// [GET] /admin/genres/
export const index = async (req: Request, res: Response): Promise<void> => {
    const genres = await Genre.find({
        deleted: false
    });

    res.render("admin/pages/genres/index", {
        pageTitle: "Genre",
        genres
    });
};

//[GET] /admin/genres/create
export const create = async (req: Request, res: Response): Promise<void> => {
    res.render('admin/pages/genres/create', {
        pageTitle: `Create New Genre`
    })
}

//[POST] /admin/genres/create
export const createPost = async (req: Request, res: Response) => {

    interface GenreInter {
        title: string,
        avatar: string
        description?: string,
        status: string
    }

    let avatar = ""

    if (req.body.avatar) {
        avatar = req.body["avatar"];
    }

    const genreObject: GenreInter = {
        title: req.body.title,
        avatar: avatar,
        description: req.body.desc,
        status: req.body.status
    }

    const genre = new Genre(genreObject);
    await genre.save();

    res.redirect(`/${systemConfig.prefixAdmin}/genres`)

}

//[GET] /admin/genres/edit/:id
export const edit = async (req: Request, res: Response) => {
    const genreId: string = `${req.params.id}`;

    try {
        const genre = await Genre.findOne({
            _id: genreId,
            deleted: false,
        });

        res.render(`admin/pages/genres/edit`, {
            pageTitle: `Edit Genre: ${genre['title']}`,
            genre
        })

    } catch (error) {
        // TODO: redirect to 404 page
        res.redirect(`/${systemConfig.prefixAdmin}/genres`)
    }
}

//[PATCH] /admin/genres/edit/:id
export const editPatch = async (req: Request, res: Response): Promise<void> => {
    const gerneID: string = `${req.params.id}`

    interface GenreInter {
        title: string,
        avatar?: string,
        description?: string
        status: string
    }

    const genreObject: GenreInter = {
        title: req.body.title,
        description: req.body.desc,
        status: req.body.status
    }

    if (req.body.avatar) {
        genreObject.avatar = req.body.avatar;
    };

    try {

        await Genre.updateOne({
            _id: gerneID
        }, genreObject)

        res.redirect(`/${systemConfig.prefixAdmin}/genres`);

    } catch (error) {
        res.redirect(`/${systemConfig.prefixAdmin}/genres`)
    }

}

//[DELETE] /admin/genres/delete/:id
export const deleteGenre = async (req: Request, res: Response): Promise<void> => {
    const genreID = `${req.params.id}`;

    try {
        await Genre.updateOne({
            _id: genreID
        }, {
            deleted: true
        });

        res.redirect(`back`)
    } catch (error) {
        // TODO: redirect to 404 page
        res.redirect(`/${systemConfig.prefixAdmin}/genres`)
    }
}

//[GET] /admin/genres/detail/:id
export const detail = async (req: Request, res: Response): Promise<void> => {
    const genreID: string = `${req.params.id}`;

    try {
        let genre = await Genre.findOne({
            _id: genreID,
            deleted: false
        });

        const totalSongInGenre = await Song.countDocuments({
            topicId: genreID,
            deleted: false
        });

        genre["totalSongInGenre"] = totalSongInGenre;

        res.render(`admin/pages/genres/detail`, {
            pageTitle: genre.title,
            genre
        })

    } catch (error) {
        // TODO: redirect to 404 page
        res.redirect(`/${systemConfig.prefixAdmin}/genres`)
    }
}