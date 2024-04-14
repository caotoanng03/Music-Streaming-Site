import { Express } from "express";
import { genreRoutes } from "./genre.route";
import { songRoutes } from "./song.route";
import { favoriteSongRoutes } from "./favorite-song.route";
import { searchRoutes } from "./search.route";
import { homeRoutes } from "./home.route";
import { userRoutes } from "./user.route";
import { userProfileRoutes } from "./user-profile.route";

import * as userMiddleware from "../../middlewares/client/user.middleware";
import * as authMiddleware from "../../middlewares/client/auth.middleware";

const clientRoutes = (app: Express): void => {
    app.use(userMiddleware.userInfo);

    app.use(`/`, homeRoutes);

    app.use(`/genres`, genreRoutes);

    app.use(`/songs`, songRoutes);

    // auth
    app.use(`/favorite-songs`, authMiddleware.requireAuth, favoriteSongRoutes);

    app.use(`/search`, searchRoutes);

    app.use(`/user`, userRoutes);

    //auth
    app.use(`/user/profile`, authMiddleware.requireAuth, userProfileRoutes);

}

export default clientRoutes;