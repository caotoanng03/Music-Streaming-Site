"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const genre_route_1 = require("./genre.route");
const song_route_1 = require("./song.route");
const favorite_song_route_1 = require("./favorite-song.route");
const search_route_1 = require("./search.route");
const clientRoutes = (app) => {
    app.use(`/genres`, genre_route_1.genreRoutes);
    app.use(`/songs`, song_route_1.songRoutes);
    app.use(`/favorite-songs`, favorite_song_route_1.favoriteSongRoutes);
    app.use(`/search`, search_route_1.searchRoutes);
};
exports.default = clientRoutes;
