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
Object.defineProperty(exports, "__esModule", { value: true });
exports.editPatch = exports.createPost = void 0;
const email_1 = require("../../helpers/email");
const password_1 = require("../../helpers/password");
const createPost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.fullName) {
        req.flash('error', 'Full name can not be empty!');
        res.redirect('back');
        return;
    }
    if (req.body.fullName.length <= 5) {
        req.flash('error', 'Full name length must be greater than 5 characters!');
        res.redirect('back');
        return;
    }
    if (!req.body.email) {
        req.flash('error', 'Email can not be empty!');
        res.redirect('back');
        return;
    }
    if (!(0, email_1.isValidEmail)(req.body.email)) {
        req.flash('error', 'Email must be in proper format!');
        res.redirect('back');
        return;
    }
    if (!req.body.password) {
        req.flash('error', 'Password can not be empty!');
        res.redirect('back');
        return;
    }
    if (!(0, password_1.isValidPassword)(req.body.password)) {
        req.flash('error', 'Password must include 1 digit, 1 upper and 1 lower. Length from 6 - 20.');
        res.redirect('back');
        return;
    }
    next();
});
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
    if (req.body.password && !(0, password_1.isValidPassword)(req.body.password)) {
        req.flash('error', 'Invalid Password! Password should contain at least 1 digit, 1 uppercase and 1 lowercase. Length should be from 6 to 20.');
        res.redirect('back');
        return;
    }
    next();
};
exports.editPatch = editPatch;
