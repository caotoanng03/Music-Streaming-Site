import { Express } from "express";
import { systemConfig } from "../../config/config";

import { dashboardRoutes } from "./dashboard.route";
import { genreRoutes } from "./genre.route";

const adminRoutes = (app: Express): void => {

    const PATH_ADMIN = `/${systemConfig.prefixAdmin}`;

    app.use(`${PATH_ADMIN}/dashboard`, dashboardRoutes);

    app.use(`${PATH_ADMIN}/genres`, genreRoutes);

}

export default adminRoutes;