import { Express } from "express";
import { genreRoutes } from "./genre.route";
import { songRoutes } from "./song.route";
import { favoriteSongRoutes } from "./favorite-song";

const clientRoutes = (app: Express): void => {
    app.use(`/genres`, genreRoutes);

    app.use(`/songs`, songRoutes);

    app.use(`/favorite-songs`, favoriteSongRoutes);
}

export default clientRoutes;