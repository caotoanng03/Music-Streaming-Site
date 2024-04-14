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
exports.detail = exports.deleteSinger = exports.editPatch = exports.edit = exports.createPost = exports.create = exports.index = void 0;
const singer_model_1 = __importDefault(require("../../models/singer.model"));
const config_1 = require("../../config/config");
const song_model_1 = __importDefault(require("../../models/song.model"));
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!res.locals.role.permissions.includes('singers_view')) {
        res.sendStatus(400);
        return;
    }
    const singers = yield singer_model_1.default.find({
        deleted: false
    });
    res.render(`admin/pages/singers/index`, {
        pageTitle: "Singer Management",
        singers
    });
});
exports.index = index;
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!res.locals.role.permissions.includes('singers_create')) {
        res.sendStatus(400);
        return;
    }
    res.render(`admin/pages/singers/create`, {
        pageTitle: "New Singer"
    });
});
exports.create = create;
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!res.locals.role.permissions.includes('singers_create')) {
        res.sendStatus(400);
        return;
    }
    ;
    let avatar = "";
    if (req.body.avatar) {
        avatar = req.body.avatar;
    }
    const singerData = {
        fullName: req.body.fullName,
        avatar: avatar,
        status: req.body.status
    };
    const singer = new singer_model_1.default(singerData);
    yield singer.save();
    req.flash('success', 'New singer was created successfully.');
    res.redirect(`/${config_1.systemConfig.prefixAdmin}/singers`);
});
exports.createPost = createPost;
const edit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!res.locals.role.permissions.includes('singers_edit')) {
        res.sendStatus(400);
        return;
    }
    const singerID = `${req.params.id}`;
    try {
        const singer = yield singer_model_1.default.findOne({
            _id: singerID,
            deleted: false
        });
        res.render(`admin/pages/singers/edit`, {
            pageTitle: "Edit Singer",
            singer
        });
    }
    catch (error) {
        res.render('errors/404', {
            pageTitle: '404 Not Found'
        });
    }
});
exports.edit = edit;
const editPatch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!res.locals.role.permissions.includes('singers_edit')) {
        res.sendStatus(400);
        return;
    }
    const singerID = `${req.params.id}`;
    const singerData = {
        fullName: req.body.fullName,
        status: req.body.status
    };
    if (req.body.avatar) {
        singerData["avatar"] = req.body.avatar;
    }
    try {
        yield singer_model_1.default.updateOne({
            _id: singerID,
            deleted: false
        }, singerData);
        req.flash('success', 'The singer was updated successfully.');
        res.redirect(`/${config_1.systemConfig.prefixAdmin}/singers`);
    }
    catch (error) {
        res.render('errors/404', {
            pageTitle: '404 Not Found'
        });
    }
});
exports.editPatch = editPatch;
const deleteSinger = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!res.locals.role.permissions.includes('singers_delete')) {
        res.sendStatus(400);
        return;
    }
    const singerId = `${req.params.id}`;
    try {
        yield singer_model_1.default.updateOne({
            _id: singerId,
            deleted: false
        }, {
            deleted: true
        });
        req.flash('success', 'The singer was deleted successfully.');
        res.redirect(`back`);
    }
    catch (error) {
        res.render('errors/404', {
            pageTitle: '404 Not Found'
        });
    }
});
exports.deleteSinger = deleteSinger;
const detail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!res.locals.role.permissions.includes('singers_view')) {
        res.sendStatus(400);
        return;
    }
    const singerID = `${req.params.id}`;
    try {
        const singer = yield singer_model_1.default.findOne({
            _id: singerID,
            deleted: false
        });
        const totalSongs = yield song_model_1.default.countDocuments({
            singerId: singerID,
            deleted: false
        });
        singer['totalSongs'] = totalSongs || 0;
        res.render(`admin/pages/singers/detail`, {
            pageTitle: `Singer Details`,
            singer
        });
    }
    catch (error) {
        res.render('errors/404', {
            pageTitle: '404 Not Found'
        });
    }
});
exports.detail = detail;
