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
exports.detail = exports.deleteGenre = exports.editPatch = exports.edit = exports.createPost = exports.create = exports.index = void 0;
const genre_model_1 = __importDefault(require("../../models/genre.model"));
const config_1 = require("../../config/config");
const song_model_1 = __importDefault(require("../../models/song.model"));
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!res.locals.role.permissions.includes('genres_view')) {
        res.sendStatus(400);
        return;
    }
    const genres = yield genre_model_1.default.find({
        deleted: false
    });
    res.render("admin/pages/genres/index", {
        pageTitle: "Genre Management",
        genres
    });
});
exports.index = index;
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!res.locals.role.permissions.includes('genres_create')) {
        res.sendStatus(400);
        return;
    }
    res.render('admin/pages/genres/create', {
        pageTitle: `Create New Genre`
    });
});
exports.create = create;
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!res.locals.role.permissions.includes('genres_create')) {
        res.sendStatus(400);
        return;
    }
    let avatar = "";
    if (req.body.avatar) {
        avatar = req.body["avatar"];
    }
    const genreObject = {
        title: req.body.title,
        avatar: avatar,
        description: req.body.desc,
        status: req.body.status
    };
    const genre = new genre_model_1.default(genreObject);
    yield genre.save();
    req.flash('success', 'New genre was created successfully.');
    res.redirect(`/${config_1.systemConfig.prefixAdmin}/genres`);
});
exports.createPost = createPost;
const edit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!res.locals.role.permissions.includes('genres_edit')) {
        res.sendStatus(400);
        return;
    }
    const genreId = `${req.params.id}`;
    try {
        const genre = yield genre_model_1.default.findOne({
            _id: genreId,
            deleted: false,
        });
        res.render(`admin/pages/genres/edit`, {
            pageTitle: `Edit Genre: ${genre['title']}`,
            genre
        });
    }
    catch (error) {
        res.redirect(`/${config_1.systemConfig.prefixAdmin}/genres`);
    }
});
exports.edit = edit;
const editPatch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!res.locals.role.permissions.includes('genres_edit')) {
        res.sendStatus(400);
        return;
    }
    const gerneID = `${req.params.id}`;
    const genreObject = {
        title: req.body.title,
        description: req.body.desc,
        status: req.body.status
    };
    if (req.body.avatar) {
        genreObject["avatar"] = req.body.avatar;
    }
    ;
    try {
        yield genre_model_1.default.updateOne({
            _id: gerneID
        }, genreObject);
        req.flash('success', 'The genre was updated successfully.');
        res.redirect(`/${config_1.systemConfig.prefixAdmin}/genres`);
    }
    catch (error) {
        res.redirect(`/${config_1.systemConfig.prefixAdmin}/genres`);
    }
});
exports.editPatch = editPatch;
const deleteGenre = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!res.locals.role.permissions.includes('genres_delete')) {
        res.sendStatus(400);
        return;
    }
    const genreID = `${req.params.id}`;
    try {
        yield genre_model_1.default.updateOne({
            _id: genreID
        }, {
            deleted: true
        });
        req.flash('success', 'The genre was deleted.');
        res.redirect(`back`);
    }
    catch (error) {
        res.redirect(`/${config_1.systemConfig.prefixAdmin}/genres`);
    }
});
exports.deleteGenre = deleteGenre;
const detail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!res.locals.role.permissions.includes('genres_view')) {
        res.sendStatus(400);
        return;
    }
    const genreID = `${req.params.id}`;
    try {
        let genre = yield genre_model_1.default.findOne({
            _id: genreID,
            deleted: false
        });
        const totalSongInGenre = yield song_model_1.default.countDocuments({
            topicId: genreID,
            deleted: false
        });
        genre["totalSongInGenre"] = totalSongInGenre;
        res.render(`admin/pages/genres/detail`, {
            pageTitle: genre.title,
            genre
        });
    }
    catch (error) {
        res.redirect(`/${config_1.systemConfig.prefixAdmin}/genres`);
    }
});
exports.detail = detail;
