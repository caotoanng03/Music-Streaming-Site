import { Request, Response } from "express";
import Genre from "../../models/genre.model";

// [GET] /genres
export const index = async (req: Request, res: Response): Promise<void> => {
    const genres = await Genre.find({ deleted: false });

    res.render("client/pages/genres/index", {
        pageTitle: "Genres",
        genres: genres
    });
};