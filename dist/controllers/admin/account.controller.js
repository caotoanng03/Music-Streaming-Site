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
exports.detail = exports.deleteAccount = exports.editPatch = exports.edit = exports.createPost = exports.create = exports.index = void 0;
const account_model_1 = __importDefault(require("../../models/account.model"));
const role_model_1 = __importDefault(require("../../models/role.model"));
const md5_1 = __importDefault(require("md5"));
const config_1 = require("../../config/config");
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!res.locals.role.permissions.includes('accounts_view')) {
        res.sendStatus(400);
        return;
    }
    const accounts = yield account_model_1.default.find({
        deleted: false
    }).select('-password -token');
    for (const account of accounts) {
        const role = yield role_model_1.default.findOne({
            _id: account.roleId,
            deleted: false
        }).select('title');
        account['role'] = role;
    }
    ;
    res.render(`admin/pages/accounts/index`, {
        pageTitle: "Admin Account Management",
        accounts
    });
});
exports.index = index;
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!res.locals.role.permissions.includes('accounts_create')) {
        res.sendStatus(400);
        return;
    }
    const roles = yield role_model_1.default.find({
        deleted: false
    }).select('title');
    res.render(`admin/pages/accounts/create`, {
        pageTitle: "New Admin Account",
        roles
    });
});
exports.create = create;
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!res.locals.role.permissions.includes('accounts_create')) {
        res.sendStatus(400);
        return;
    }
    let avatar = "";
    if (req.body.avatar) {
        avatar = req.body.avatar;
    }
    const accountData = {
        fullName: req.body.fullName,
        email: req.body.email,
        password: (0, md5_1.default)(req.body.password),
        phone: req.body.phone,
        avatar: avatar,
        roleId: req.body.roleId,
        status: req.body.status
    };
    const newAccount = new account_model_1.default(accountData);
    yield newAccount.save();
    res.redirect(`/${config_1.systemConfig.prefixAdmin}/accounts`);
});
exports.createPost = createPost;
const edit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!res.locals.role.permissions.includes('accounts_edit')) {
        res.sendStatus(400);
        return;
    }
    const accountId = `${req.params.id}`;
    try {
        const account = yield account_model_1.default.findOne({
            _id: accountId,
            deleted: false
        }).select('-password -token');
        const roles = yield role_model_1.default.find({ deleted: false });
        res.render(`admin/pages/accounts/edit`, {
            pageTitle: `Edit Admin Account`,
            account,
            roles
        });
    }
    catch (error) {
        res.redirect(`/${config_1.systemConfig.prefixAdmin}/accounts`);
    }
});
exports.edit = edit;
const editPatch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!res.locals.role.permissions.includes('accounts_edit')) {
        res.sendStatus(400);
        return;
    }
    const accountId = `${req.params.id}`;
    const accountData = {
        fullName: req.body.fullName,
        email: req.body.email,
        phone: req.body.phone,
        roleId: req.body.roleId,
        status: req.body.status
    };
    if (req.body.avatar) {
        accountData['avatar'] = req.body.avatar;
    }
    if (req.body.password) {
        accountData['password'] = (0, md5_1.default)(req.body.password);
    }
    yield account_model_1.default.updateOne({
        _id: accountId,
        deleted: false
    }, accountData);
    res.redirect(`/${config_1.systemConfig.prefixAdmin}/accounts`);
});
exports.editPatch = editPatch;
const deleteAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!res.locals.role.permissions.includes('accounts_delete')) {
        res.sendStatus(400);
        return;
    }
    const accountId = `${req.params.id}`;
    yield account_model_1.default.updateOne({
        _id: accountId,
        deleted: false
    }, {
        deleted: true
    });
    res.redirect(`back`);
});
exports.deleteAccount = deleteAccount;
const detail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!res.locals.role.permissions.includes('accounts_view')) {
        res.sendStatus(400);
        return;
    }
    const accountId = `${req.params.id}`;
    try {
        const account = yield account_model_1.default.findOne({
            _id: accountId,
            deleted: false
        }).select('-password -token');
        const role = yield role_model_1.default.findOne({
            _id: account.roleId,
            deleted: false
        }).select('title');
        account['role'] = role;
        res.render(`admin/pages/accounts/detail`, {
            pageTitle: "Admin Account Detail",
            account
        });
    }
    catch (error) {
        res.redirect(`/${config_1.systemConfig.prefixAdmin}/accounts`);
    }
});
exports.detail = detail;
