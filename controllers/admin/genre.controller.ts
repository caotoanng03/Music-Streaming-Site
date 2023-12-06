import { Request, Response } from "express";

import Genre from "../../models/genre.model";

// [GET] /admin/genres/
export const index = async (req: Request, res: Response): Promise<void> => {
    const genres = await Genre.find({
        deleted: false
    });

    res.render("admin/pages/genres/index", {
        pageTitle: "Admin | Genre",
        genres
    });
};