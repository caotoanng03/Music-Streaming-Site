import { Express } from "express";
import { systemConfig } from "../../config/config";

import { dashboardRoutes } from "./dashboard.route";
import { genreRoutes } from "./genre.route";
import { songRoutes } from "./song.route";
import { uploadRoutes } from "./upload.route";
import { singerRoutes } from "./singer.route";
import { roleRoutes } from "./role.route";
import { accountRoutes } from "./account.route";
import { authRoutes } from "./auth.route";

import * as authController from "../../controllers/admin/auth.controller";
import * as authMiddleware from "../../middlewares/admin/auth.middleware";
import { myAdminRoutes } from "./my-admin.route";
import { userRoutes } from "./user.route";

const adminRoutes = (app: Express): void => {

    const PATH_ADMIN = `/${systemConfig.prefixAdmin}`;

    app.get(PATH_ADMIN, authController.login);

    app.use(`${PATH_ADMIN}/auth`, authRoutes);

    app.use(`${PATH_ADMIN}/dashboard`, authMiddleware.requireAuth, dashboardRoutes);

    app.use(`${PATH_ADMIN}/genres`, authMiddleware.requireAuth, genreRoutes);

    app.use(`${PATH_ADMIN}/songs`, authMiddleware.requireAuth, songRoutes);

    app.use(`${PATH_ADMIN}/upload`, authMiddleware.requireAuth, uploadRoutes);

    app.use(`${PATH_ADMIN}/singers`, authMiddleware.requireAuth, singerRoutes);

    app.use(`${PATH_ADMIN}/roles`, authMiddleware.requireAuth, roleRoutes);

    app.use(`${PATH_ADMIN}/accounts`, authMiddleware.requireAuth, accountRoutes);

    app.use(`${PATH_ADMIN}/my-admin`, authMiddleware.requireAuth, myAdminRoutes);

    app.use(`${PATH_ADMIN}/users`, authMiddleware.requireAuth, userRoutes);

}

export default adminRoutes;