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
    const singers = yield singer_model_1.default.find({
        deleted: false
    });
    res.render(`admin/pages/singers/index`, {
        pageTitle: "Singers",
        singers
    });
});
exports.index = index;
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.render(`admin/pages/singers/create`, {
        pageTitle: "New Singer"
    });
});
exports.create = create;
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
    res.redirect(`/${config_1.systemConfig.prefixAdmin}/singers`);
});
exports.createPost = createPost;
const edit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        res.redirect(`/${config_1.systemConfig.prefixAdmin}/singers`);
    }
});
exports.edit = edit;
const editPatch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        res.redirect(`/${config_1.systemConfig.prefixAdmin}/singers`);
    }
    catch (error) {
        res.redirect(`/${config_1.systemConfig.prefixAdmin}/singers`);
    }
});
exports.editPatch = editPatch;
const deleteSinger = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const singerId = `${req.params.id}`;
    try {
        yield singer_model_1.default.updateOne({
            _id: singerId,
            deleted: false
        }, {
            deleted: true
        });
        res.redirect(`back`);
    }
    catch (error) {
        res.redirect(`/${config_1.systemConfig.prefixAdmin}/singers`);
    }
});
exports.deleteSinger = deleteSinger;
const detail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        res.redirect(`/${config_1.systemConfig.prefixAdmin}/singers`);
    }
});
exports.detail = detail;
