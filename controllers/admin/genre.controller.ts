import { Request, Response } from "express";

import Genre from "../../models/genre.model";
import { systemConfig } from "../../config/config";

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
        description: req.body.description,
        status: req.body.status
    }

    const genre = new Genre(genreObject);
    await genre.save();

    res.redirect(`/${systemConfig.prefixAdmin}/genres`)

}