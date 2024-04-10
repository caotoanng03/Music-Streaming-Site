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
exports.editPatch = exports.edit = exports.index = void 0;
const account_model_1 = __importDefault(require("../../models/account.model"));
const config_1 = require("../../config/config");
const role_model_1 = __importDefault(require("../../models/role.model"));
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.render(`admin/pages/my-admin/index`, {
        pageTitle: 'Admin Information'
    });
});
exports.index = index;
const edit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const roles = yield role_model_1.default.find({
        deleted: false
    });
    res.render(`admin/pages/my-admin/edit`, {
        pageTitle: 'Edit Admin Profile',
        roles
    });
});
exports.edit = edit;
const editPatch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const admin = res.locals.admin;
    const permissions = res.locals.role.permissions;
    const email = req.body.email;
    const alreadyExistedAccount = yield account_model_1.default.find({
        email: email,
        deleted: false,
    });
    if (alreadyExistedAccount.length === 1 && email !== admin.email) {
        req.flash('error', 'This email already existed!');
        res.redirect('back');
        return;
    }
    const AccountData = {
        fullName: req.body.fullName,
        email: req.body.email,
    };
    if (req.body.avatar) {
        AccountData['avatar'] = req.body.avatar;
    }
    if (req.body.phone) {
        AccountData['phone'] = req.body.phone;
    }
    if (permissions.includes('roles_permissions')) {
        if (req.body.roleId) {
            AccountData['roleId'] = req.body.roleId;
        }
        if (req.body.status) {
            AccountData['status'] = req.body.status;
        }
    }
    yield account_model_1.default.updateOne({
        _id: admin.id,
        deleted: false
    }, AccountData);
    req.flash('success', 'Updated Successfully!');
    res.redirect(`/${config_1.systemConfig.prefixAdmin}/my-admin`);
});
exports.editPatch = editPatch;
