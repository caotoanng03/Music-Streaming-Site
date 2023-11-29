import { Express, Router, Request, Response } from "express";
const router: Router = Router();

import Genre from "../../models/genre.model";

router.get("/", async (req: Request, res: Response): Promise<void> => {

    const genres = await Genre.find({ deleted: false });
    console.log(genres);

    res.render("client/pages/genres/index");
});

export const genresRoutes: Router = router;