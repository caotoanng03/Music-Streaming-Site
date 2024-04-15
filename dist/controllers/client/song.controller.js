"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listen = exports.favorite = exports.like = exports.detail = exports.list = void 0;
const genre_model_1 = __importDefault(require("../../models/genre.model"));
const song_model_1 = __importDefault(require("../../models/song.model"));
const singer_model_1 = __importDefault(require("../../models/singer.model"));
const favorite_song_model_1 = __importDefault(require("../../models/favorite-song.model"));
const list = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const genre = yield genre_model_1.default.findOne({
        slug: req.params.slugGenre,
        status: "active",
        deleted: false
    });
    if (!genre) {
        res.redirect("/genres");
        return;
    }
    ;
    const songs = yield song_model_1.default.find({
        topicId: genre.id,
        status: "active",
        deleted: "false"
    }).select("title avatar singerId like slug createdAt");
    for (const song of songs) {
        const singerInfo = yield singer_model_1.default.findOne({
            _id: song.singerId,
            status: "active",
            deleted: false
        });
        song["singerInfo"] = singerInfo;
    }
    ;
    res.render("client/pages/songs/list", {
        pageTitle: genre.title,
        songs: songs
    });
});
exports.list = list;
const detail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const song = yield song_model_1.default.findOne({
        slug: req.params.songSlug,
        status: "active",
        deleted: false
    });
    if (!song) {
        res.redirect(`back`);
        return;
    }
    const singer = yield singer_model_1.default.findOne({
        _id: song.singerId,
        status: "active",
        deleted: false
    }).select("fullName avatar");
    if (!singer) {
        res.redirect(`back`);
        return;
    }
    const genre = yield genre_model_1.default.findOne({
        _id: song.topicId,
        status: "active",
        deleted: false
    }).select("title");
    let favoriteSong;
    if (res.locals.user) {
        favoriteSong = yield favorite_song_model_1.default.findOne({
            userId: res.locals.user.id,
            songId: song.id
        });
    }
    song["isFavoriteSong"] = favoriteSong ? true : false;
    res.render("client/pages/songs/detail", {
        pageTitle: "Detail | " + song.title,
        song: song,
        singer: singer,
        genre: genre
    });
});
exports.detail = detail;
const like = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!res.locals.user) {
        res.json({
            code: 400,
            message: "Unthorized user!"
        });
        return;
    }
    const songId = req.params.songId;
    const typeLike = req.params.typeLike;
    const song = yield song_model_1.default.findOne({
        _id: songId,
        status: "active",
        deleted: false
    });
    if (typeLike == "like") {
        song.like.push(res.locals.user.id);
    }
    else {
        const index = song.like.findIndex(e => e === res.locals.user.id);
        song.like.splice(index, 1);
    }
    yield song_model_1.default.updateOne({
        _id: songId
    }, { like: song.like });
    res.json({
        code: 200,
        message: "Success",
        like: song.like.length
    });
});
exports.like = like;
const favorite = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!res.locals.user) {
        res.json({
            code: 400,
            message: "Unthorized user!"
        });
        return;
    }
    const songId = req.params.songId;
    const favoriteType = req.params.favoriteType;
    switch (favoriteType) {
        case "favorite":
            const existingFavSong = yield favorite_song_model_1.default.findOne({
                userId: res.locals.user.id,
                songId: songId
            });
            if (!existingFavSong) {
                const newFavSong = new favorite_song_model_1.default({
                    userId: res.locals.user.id,
                    songId: songId
                });
                yield newFavSong.save();
            }
            ;
            break;
        case "unfavorite":
            yield favorite_song_model_1.default.deleteOne({
                songId: songId
            });
            break;
        default:
            break;
    }
    res.json({
        code: 200,
        message: "Success"
    });
});
exports.favorite = favorite;
const listen = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const songId = req.params.songId;
    const song = yield song_model_1.default.findOne({ _id: songId });
    if (song) {
        const listen = song.listen + 1;
        yield song_model_1.default.updateOne({
            _id: songId
        }, { listen: listen });
        const newSong = yield song_model_1.default.findOne({
            _id: songId
        });
        res.json({
            code: 200,
            message: "Success!",
            listen: newSong.listen
        });
    }
    ;
});
exports.listen = listen;
