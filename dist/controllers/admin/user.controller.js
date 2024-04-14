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
exports.detail = exports.deleteUser = exports.editPatch = exports.edit = exports.createPost = exports.create = exports.index = void 0;
const user_model_1 = __importDefault(require("../../models/user.model"));
const md5_1 = __importDefault(require("md5"));
const config_1 = require("../../config/config");
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!res.locals.role.permissions.includes('users_view')) {
        res.sendStatus(400);
        return;
    }
    const users = yield user_model_1.default.find({ deleted: false });
    res.render(`admin/pages/users/index`, {
        pageTitle: 'User Account Management',
        users
    });
});
exports.index = index;
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!res.locals.role.permissions.includes('users_create')) {
        res.sendStatus(400);
        return;
    }
    res.render(`admin/pages/users/create`, {
        pageTitle: 'New User Account'
    });
});
exports.create = create;
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!res.locals.role.permissions.includes('users_create')) {
        res.sendStatus(400);
        return;
    }
    const { fullName, email, password, status } = req.body;
    const userData = {
        fullName,
        email,
        status,
        password: (0, md5_1.default)(password)
    };
    if (req.body.avatar) {
        userData["avatar"] = req.body.avatar;
    }
    if (req.body.phone) {
        userData["phone"] = req.body.phone;
    }
    const newUser = new user_model_1.default(userData);
    yield newUser.save();
    req.flash('success', 'New user was just created!');
    res.redirect(`/${config_1.systemConfig.prefixAdmin}/users`);
});
exports.createPost = createPost;
const edit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!res.locals.role.permissions.includes('users_edit')) {
        res.sendStatus(400);
        return;
    }
    const id = req.params.id;
    try {
        const user = yield user_model_1.default.findOne({
            _id: id,
            deleted: false
        }).select('-password -token');
        res.render(`admin/pages/users/edit`, {
            pageTitle: 'Edit User Account',
            user
        });
    }
    catch (error) {
        res.redirect(`/${config_1.systemConfig.prefixAdmin}/users`);
    }
});
exports.edit = edit;
const editPatch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!res.locals.role.permissions.includes('users_edit')) {
        res.sendStatus(400);
        return;
    }
    const userId = `${req.params.id}`;
    const userData = {
        fullName: req.body.fullName,
        email: req.body.email,
        phone: req.body.phone,
        status: req.body.status
    };
    if (req.body.avatar) {
        userData['avatar'] = req.body.avatar;
    }
    if (req.body.password) {
        userData['password'] = (0, md5_1.default)(req.body.password);
    }
    yield user_model_1.default.updateOne({
        _id: userId,
        deleted: false
    }, userData);
    req.flash('success', 'The user account was updated successfully');
    res.redirect(`/${config_1.systemConfig.prefixAdmin}/users`);
});
exports.editPatch = editPatch;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!res.locals.role.permissions.includes('users_delete')) {
        res.sendStatus(400);
        return;
    }
    const userId = `${req.params.id}`;
    yield user_model_1.default.updateOne({
        _id: userId,
        deleted: false
    }, {
        deleted: true
    });
    req.flash('success', 'The account was deleted successfully');
    res.redirect(`back`);
});
exports.deleteUser = deleteUser;
const detail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!res.locals.role.permissions.includes('users_view')) {
        res.sendStatus(400);
        return;
    }
    const userId = req.params.id;
    try {
        const user = yield user_model_1.default.findOne({
            _id: userId,
            deleted: false
        }).select('-password -token');
        res.render(`admin/pages/users/detail`, {
            pageTitle: 'User Account Detail',
            user
        });
    }
    catch (error) {
        res.redirect(`/${config_1.systemConfig.prefixAdmin}/users`);
    }
});
exports.detail = detail;
