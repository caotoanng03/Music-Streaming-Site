"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.editPatch = exports.createPost = void 0;
const email_1 = require("../../helpers/email");
const password_1 = require("../../helpers/password");
const createPost = (req, res, next) => {
    if (!req.body.fullName) {
        req.flash('error', 'Name can not be empty!');
        res.redirect('back');
        return;
    }
    if (req.body.fullName.length < 5) {
        req.flash('error', 'Name must be at least 5 letters!');
        res.redirect('back');
        return;
    }
    if (!req.body.email) {
        req.flash('error', 'Email can not be empty!');
        res.redirect('back');
        return;
    }
    if (!(0, email_1.isValidEmail)(req.body.email)) {
        req.flash('error', 'Invalid Email! The valid email should be like: example@gmail.com');
        res.redirect('back');
        return;
    }
    if (!req.body.password) {
        req.flash('error', 'Password can not be empty!');
        res.redirect('back');
        return;
    }
    if (!(0, password_1.isValidPassword)(req.body.password)) {
        req.flash('error', 'Invalid Password! Password should contain at least 1 digit, 1 uppercase and 1 lowercase. Length should be from 6 to 20.');
        res.redirect('back');
        return;
    }
    if (!req.body.retypedPassword) {
        req.flash('error', 'Retyped password can not be empty!');
        res.redirect('back');
        return;
    }
    if (req.body.password !== req.body.retypedPassword) {
        req.flash('error', 'Retyped password does not match!');
        res.redirect('back');
        return;
    }
    if (!req.body.roleId) {
        req.flash('error', 'Role of admin must be chosen!');
        res.redirect('back');
        return;
    }
    next();
};
exports.createPost = createPost;
const editPatch = (req, res, next) => {
    if (!req.body.fullName) {
        req.flash('error', 'Name can not be empty!');
        res.redirect('back');
        return;
    }
    if (req.body.fullName.length < 5) {
        req.flash('error', 'Name must be at least 5 letters!');
        res.redirect('back');
        return;
    }
    if (!req.body.email) {
        req.flash('error', 'Email can not be empty!');
        res.redirect('back');
        return;
    }
    if (!(0, email_1.isValidEmail)(req.body.email)) {
        req.flash('error', 'Invalid Email! The valid email should be like: example@gmail.com');
        res.redirect('back');
        return;
    }
    if ((req.body.password && !req.body.retypedPassword) || (!req.body.password && req.body.retypedPassword)) {
        req.flash('error', 'Password and retyped password can not be empty!');
        res.redirect('back');
        return;
    }
    if (req.body.password && !(0, password_1.isValidPassword)(req.body.password)) {
        req.flash('error', 'Invalid Password! Password should contain at least 1 digit, 1 uppercase and 1 lowercase. Length should be from 6 to 20.');
        res.redirect('back');
        return;
    }
    if (req.body.password !== req.body.retypedPassword) {
        req.flash('error', 'Retyped password does not match!');
        res.redirect('back');
        return;
    }
    if (!req.body.roleId) {
        req.flash('error', 'Role of admin must be chosen!');
        res.redirect('back');
        return;
    }
    next();
};
exports.editPatch = editPatch;
