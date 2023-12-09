import { Express } from "express";
import { systemConfig } from "../../config/config";

import { dashboardRoutes } from "./dashboard.route";
import { genreRoutes } from "./genre.route";
import { songRoutes } from "./song.route";
import { uploadRoutes } from "./upload.route";

const adminRoutes = (app: Express): void => {

    const PATH_ADMIN = `/${systemConfig.prefixAdmin}`;

    app.use(`${PATH_ADMIN}/dashboard`, dashboardRoutes);

    app.use(`${PATH_ADMIN}/genres`, genreRoutes);

    app.use(`${PATH_ADMIN}/songs`, songRoutes);

    app.use(`${PATH_ADMIN}/upload`, uploadRoutes);

}

export default adminRoutes;