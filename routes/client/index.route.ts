import { Express } from "express";
import { genresRoutes } from "./genre.route";

const clientRoutes = (app: Express): void => {
    app.use(`/genres`, genresRoutes);
}

export default clientRoutes;