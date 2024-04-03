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
exports.createPost = exports.create = exports.index = void 0;
const genre_model_1 = __importDefault(require("../../models/genre.model"));
const config_1 = require("../../config/config");
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const genres = yield genre_model_1.default.find({
        deleted: false
    });
    res.render("admin/pages/genres/index", {
        pageTitle: "Genre",
        genres
    });
});
exports.index = index;
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.render('admin/pages/genres/create', {
        pageTitle: `Create New Genre`
    });
});
exports.create = create;
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let avatar = "";
    if (req.body.avatar) {
        avatar = req.body["avatar"];
    }
    const genreObject = {
        title: req.body.title,
        avatar: avatar,
        description: req.body.description,
        status: req.body.status
    };
    const genre = new genre_model_1.default(genreObject);
    yield genre.save();
    res.redirect(`/${config_1.systemConfig.prefixAdmin}/genres`);
});
exports.createPost = createPost;
