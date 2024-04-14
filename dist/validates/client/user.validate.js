"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPasswordPost = exports.otpPasswordPost = exports.forgotPasswordPost = exports.loginPost = exports.registerPost = void 0;
const email_1 = require("../../helpers/email");
const password_1 = require("../../helpers/password");
const registerPost = (req, res, next) => {
    if (!req.body.fullName) {
        req.flash('error', 'Full Name can not be empty!');
        res.redirect('back');
        return;
    }
    if (!req.body.email) {
        req.flash('error', 'Email can not be empty!');
        res.redirect('back');
        return;
    }
    if (!req.body.password) {
        req.flash('error', 'Password can not be empty!');
        res.redirect('back');
        return;
    }
    if (!(0, email_1.isValidEmail)(req.body.email)) {
        req.flash('error', 'Email must be in proper format!');
        res.redirect('back');
        return;
    }
    if (!(0, password_1.isValidPassword)(req.body.password)) {
        req.flash('error', 'Password must be 6-20 including 1 digit, 1 uppercase and 1 lowercase!');
        res.redirect('back');
        return;
    }
    next();
};
exports.registerPost = registerPost;
const loginPost = (req, res, next) => {
    if (!req.body.email) {
        req.flash('error', 'Email can not be empty!');
        res.redirect('back');
        return;
    }
    if (!req.body.password) {
        req.flash('error', 'Password can not be empty!');
        res.redirect('back');
        return;
    }
    if (!(0, email_1.isValidEmail)(req.body.email)) {
        req.flash('error', 'Email must be in proper format!');
        res.redirect('back');
        return;
    }
    if (!(0, password_1.isValidPassword)(req.body.password)) {
        req.flash('error', 'Password must be 6-20 including 1 digit, 1 uppercase and 1 lowercase!');
        res.redirect('back');
        return;
    }
    next();
};
exports.loginPost = loginPost;
const forgotPasswordPost = (req, res, next) => {
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
    next();
};
exports.forgotPasswordPost = forgotPasswordPost;
const otpPasswordPost = (req, res, next) => {
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
    if (!req.body.otp) {
        req.flash('error', 'Otp code can not be empty!');
        res.redirect('back');
        return;
    }
    next();
};
exports.otpPasswordPost = otpPasswordPost;
const resetPasswordPost = (req, res, next) => {
    if (!req.body.password) {
        req.flash('error', 'Password can not be empty!');
        res.redirect('back');
        return;
    }
    if (!req.body.confirmPassword) {
        req.flash('error', 'Confirm password can not be empty!');
        res.redirect('back');
        return;
    }
    if (!(0, password_1.isValidPassword)(req.body.password)) {
        req.flash('error', 'Password must be 6-20 including 1 digit, 1 uppercase and 1 lowercase!');
        res.redirect('back');
        return;
    }
    if (req.body.password !== req.body.confirmPassword) {
        req.flash('error', 'Confirm password does not match');
        res.redirect('back');
        return;
    }
    next();
};
exports.resetPasswordPost = resetPasswordPost;
