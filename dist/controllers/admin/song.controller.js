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
exports.deleteSong = exports.detail = exports.editPatch = exports.edit = exports.createPost = exports.create = exports.index = void 0;
const song_model_1 = __importDefault(require("../../models/song.model"));
const genre_model_1 = __importDefault(require("../../models/genre.model"));
const singer_model_1 = __importDefault(require("../../models/singer.model"));
const config_1 = require("../../config/config");
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!res.locals.role.permissions.includes('songs_view')) {
        res.sendStatus(400);
        return;
    }
    const songs = yield song_model_1.default.find({
        deleted: false
    });
    res.render("admin/pages/songs/index", {
        pageTitle: "Song Management",
        songs
    });
});
exports.index = index;
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!res.locals.role.permissions.includes('songs_create')) {
        res.sendStatus(400);
        return;
    }
    const genres = yield genre_model_1.default.find({
        deleted: false,
        status: "active"
    }).select("title");
    const singers = yield singer_model_1.default.find({
        deleted: false,
        status: "active"
    }).select("fullName");
    res.render("admin/pages/songs/create", {
        pageTitle: "New Song",
        genres,
        singers
    });
});
exports.create = create;
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!res.locals.role.permissions.includes('songs_create')) {
        res.sendStatus(400);
        return;
    }
    ;
    let avatar = "";
    let audio = "";
    if (req.body.avatar) {
        avatar = req.body.avatar[0];
    }
    ;
    if (req.body.audio) {
        audio = req.body.audio[0];
    }
    ;
    const objectSong = {
        title: req.body.title,
        topicId: req.body.topicId,
        singerId: req.body.singerId,
        description: req.body.description,
        status: req.body.status,
        avatar: avatar,
        audio: audio,
        lyrics: req.body.lyrics
    };
    const song = new song_model_1.default(objectSong);
    yield song.save();
    req.flash('success', 'New song was created successfully.');
    res.redirect(`/${config_1.systemConfig.prefixAdmin}/songs`);
});
exports.createPost = createPost;
const edit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!res.locals.role.permissions.includes('songs_edit')) {
        res.sendStatus(400);
        return;
    }
    const songId = `${req.params.id}`;
    try {
        const song = yield song_model_1.default.findOne({
            _id: songId,
            deleted: false
        });
        const genres = yield genre_model_1.default.find({
            deleted: false,
            status: "active"
        }).select("title");
        const singers = yield singer_model_1.default.find({
            deleted: false,
            status: "active"
        }).select("fullName");
        res.render(`admin/pages/songs/edit.pug`, {
            pageTitle: `Edit Song`,
            song,
            genres,
            singers
        });
    }
    catch (error) {
        res.redirect(`/${config_1.systemConfig.prefixAdmin}/songs`);
    }
    ;
});
exports.edit = edit;
const editPatch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!res.locals.role.permissions.includes('songs_edit')) {
        res.sendStatus(400);
        return;
    }
    const songId = `${req.params.id}`;
    ;
    const songData = {
        title: req.body.title,
        topicId: req.body.topicId,
        singerId: req.body.singerId,
        description: req.body.description,
        status: req.body.status,
        lyrics: req.body.lyrics
    };
    if (req.body.avatar) {
        songData["avatar"] = req.body.avatar[0];
    }
    ;
    if (req.body.audio) {
        songData["audio"] = req.body.audio[0];
    }
    ;
    try {
        yield song_model_1.default.updateOne({
            _id: songId,
        }, songData);
        req.flash('success', 'The song was updated successfully.');
        res.redirect(`/${config_1.systemConfig.prefixAdmin}/songs`);
    }
    catch (error) {
        res.redirect(`/${config_1.systemConfig.prefixAdmin}/songs`);
    }
    ;
});
exports.editPatch = editPatch;
const detail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!res.locals.role.permissions.includes('songs_view')) {
        res.sendStatus(400);
        return;
    }
    const songId = `${req.params.id}`;
    try {
        const song = yield song_model_1.default.findOne({
            _id: songId,
            deleted: false,
        });
        const singer = yield singer_model_1.default.findOne({
            _id: song.singerId,
            deleted: false,
        }).select('fullName');
        const genre = yield genre_model_1.default.findOne({
            _id: song.topicId,
            deleted: false,
        }).select('title');
        res.render(`admin/pages/songs/detail.pug`, {
            pageTitle: `${song['title']}`,
            song,
            singer,
            genre
        });
    }
    catch (error) {
        res.redirect(`/${config_1.systemConfig.prefixAdmin}/songs`);
    }
});
exports.detail = detail;
const deleteSong = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!res.locals.role.permissions.includes('songs_delete')) {
        res.sendStatus(400);
        return;
    }
    const songId = `${req.params.id}`;
    try {
        yield song_model_1.default.updateOne({
            _id: songId
        }, {
            deleted: true
        });
        req.flash('success', 'The song was deleted successfully.');
        res.redirect(`back`);
    }
    catch (error) {
        res.redirect(`/${config_1.systemConfig.prefixAdmin}/songs`);
    }
});
exports.deleteSong = deleteSong;
