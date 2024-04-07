"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../../config/config");
const dashboard_route_1 = require("./dashboard.route");
const genre_route_1 = require("./genre.route");
const song_route_1 = require("./song.route");
const upload_route_1 = require("./upload.route");
const singer_route_1 = require("./singer.route");
const role_route_1 = require("./role.route");
const account_route_1 = require("./account.route");
const auth_route_1 = require("./auth.route");
const authController = __importStar(require("../../controllers/admin/auth.controller"));
const adminRoutes = (app) => {
    const PATH_ADMIN = `/${config_1.systemConfig.prefixAdmin}`;
    app.get(PATH_ADMIN, authController.login);
    app.use(`${PATH_ADMIN}/auth`, auth_route_1.authRoutes);
    app.use(`${PATH_ADMIN}/dashboard`, dashboard_route_1.dashboardRoutes);
    app.use(`${PATH_ADMIN}/genres`, genre_route_1.genreRoutes);
    app.use(`${PATH_ADMIN}/songs`, song_route_1.songRoutes);
    app.use(`${PATH_ADMIN}/upload`, upload_route_1.uploadRoutes);
    app.use(`${PATH_ADMIN}/singers`, singer_route_1.singerRoutes);
    app.use(`${PATH_ADMIN}/roles`, role_route_1.roleRoutes);
    app.use(`${PATH_ADMIN}/accounts`, account_route_1.accountRoutes);
};
exports.default = adminRoutes;
