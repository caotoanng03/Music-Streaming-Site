import { Express } from "express";
import { genreRoutes } from "./genre.route";
import { songRoutes } from "./song.route";
import { favoriteSongRoutes } from "./favorite-song.route";
import { searchRoutes } from "./search.route";
import { homeRoutes } from "./home.route";
import { userRoutes } from "./user.route";

const clientRoutes = (app: Express): void => {
    app.use(`/`, homeRoutes);

    app.use(`/genres`, genreRoutes);

    app.use(`/songs`, songRoutes);

    app.use(`/favorite-songs`, favoriteSongRoutes);

    app.use(`/search`, searchRoutes);

    app.use(`/user`, userRoutes);

}

export default clientRoutes;