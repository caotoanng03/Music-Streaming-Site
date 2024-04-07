import { Express } from "express";
import { systemConfig } from "../../config/config";

import { dashboardRoutes } from "./dashboard.route";
import { genreRoutes } from "./genre.route";
import { songRoutes } from "./song.route";
import { uploadRoutes } from "./upload.route";
import { singerRoutes } from "./singer.route";
import { roleRoutes } from "./role.route";
import { accountRoutes } from "./account.route";

const adminRoutes = (app: Express): void => {

    const PATH_ADMIN = `/${systemConfig.prefixAdmin}`;

    app.use(`${PATH_ADMIN}/dashboard`, dashboardRoutes);

    app.use(`${PATH_ADMIN}/genres`, genreRoutes);

    app.use(`${PATH_ADMIN}/songs`, songRoutes);

    app.use(`${PATH_ADMIN}/upload`, uploadRoutes);

    app.use(`${PATH_ADMIN}/singers`, singerRoutes);

    app.use(`${PATH_ADMIN}/roles`, roleRoutes);

    app.use(`${PATH_ADMIN}/accounts`, accountRoutes);

}

export default adminRoutes;