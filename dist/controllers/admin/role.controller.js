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
exports.permissionsPatch = exports.permissions = exports.detail = exports.deleteRole = exports.editPatch = exports.edit = exports.createPost = exports.create = exports.index = void 0;
const role_model_1 = __importDefault(require("../../models/role.model"));
const config_1 = require("../../config/config");
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!res.locals.role.permissions.includes('roleGroups_view')) {
        res.sendStatus(400);
        return;
    }
    const roles = (yield role_model_1.default.find({
        deleted: false
    })) || [];
    res.render(`admin/pages/roles/index`, {
        pageTitle: "Role Group Management",
        roles
    });
});
exports.index = index;
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!res.locals.role.permissions.includes('roleGroups_create')) {
        res.sendStatus(400);
        return;
    }
    res.render(`admin/pages/roles/create`, {
        pageTitle: "New Role Group"
    });
});
exports.create = create;
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!res.locals.role.permissions.includes('roleGroups_create')) {
        res.sendStatus(400);
        return;
    }
    let desc = "";
    if (req.body.desc) {
        desc = req.body.desc;
    }
    const roleData = {
        title: req.body.title,
        description: desc
    };
    const newRole = new role_model_1.default(roleData);
    yield newRole.save();
    req.flash('success', 'New role group was created successfully');
    res.redirect(`/${config_1.systemConfig.prefixAdmin}/roles`);
});
exports.createPost = createPost;
const edit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!res.locals.role.permissions.includes('roleGroups_edit')) {
        res.sendStatus(400);
        return;
    }
    const roleID = `${req.params.id}`;
    try {
        const role = yield role_model_1.default.findOne({
            _id: roleID,
            deleted: false
        });
        res.render(`admin/pages/roles/edit`, {
            pageTitle: `Edit Role Group ${role.title}`,
            role
        });
    }
    catch (error) {
        res.redirect(`/${config_1.systemConfig.prefixAdmin}/roles`);
    }
});
exports.edit = edit;
const editPatch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!res.locals.role.permissions.includes('roleGroups_edit')) {
        res.sendStatus(400);
        return;
    }
    const roleID = `${req.params.id}`;
    const roleData = {
        title: req.body.title
    };
    if (req.body.desc) {
        roleData['description'] = req.body.desc;
    }
    yield role_model_1.default.updateOne({
        _id: roleID,
        deleted: false
    }, roleData);
    req.flash('success', 'The role group was updated successfully');
    res.redirect(`/${config_1.systemConfig.prefixAdmin}/roles`);
});
exports.editPatch = editPatch;
const deleteRole = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!res.locals.role.permissions.includes('roleGroups_delete')) {
        res.sendStatus(400);
        return;
    }
    const roleID = `${req.params.id}`;
    try {
        yield role_model_1.default.updateOne({
            _id: roleID
        }, {
            deleted: true
        });
        req.flash('success', 'The role group was deleted successfully');
        res.redirect(`back`);
    }
    catch (error) {
        res.redirect(`/${config_1.systemConfig.prefixAdmin}/roles`);
    }
});
exports.deleteRole = deleteRole;
const detail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!res.locals.role.permissions.includes('roleGroups_view')) {
        res.sendStatus(400);
        return;
    }
    const roleID = `${req.params.id}`;
    try {
        const role = yield role_model_1.default.findOne({
            _id: roleID,
            deleted: false
        });
        res.render(`admin/pages/roles/detail`, {
            pageTitle: `Detail - ${role.title}`,
            role
        });
    }
    catch (error) {
        res.redirect(`/${config_1.systemConfig.prefixAdmin}/roles`);
    }
});
exports.detail = detail;
const permissions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!res.locals.role.permissions.includes('roles_permissions')) {
        res.sendStatus(400);
        return;
    }
    const roles = yield role_model_1.default.find({
        deleted: false
    });
    res.render(`admin/pages/roles/permissions`, {
        pageTitle: "Access Controls Panel",
        roles
    });
});
exports.permissions = permissions;
const permissionsPatch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!res.locals.role.permissions.includes('roles_permissions')) {
        res.sendStatus(400);
        return;
    }
    const permissions = JSON.parse(req.body.permissions);
    for (const item of permissions) {
        yield role_model_1.default.updateOne({
            _id: item.id
        }, {
            permissions: item.permissions
        });
    }
    req.flash('success', 'Changes applied successfully.');
    res.redirect(`back`);
});
exports.permissionsPatch = permissionsPatch;
