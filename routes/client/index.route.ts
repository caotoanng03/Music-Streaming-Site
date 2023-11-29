import { Express } from "express";
import { genreRoutes } from "./genre.route";
import { songRoutes } from "./song.route";

const clientRoutes = (app: Express): void => {
    app.use(`/genres`, genreRoutes);

    app.use(`/songs`, songRoutes);
}

export default clientRoutes;