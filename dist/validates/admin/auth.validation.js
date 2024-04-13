"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginPost = void 0;
const email_1 = require("../../helpers/email");
const loginPost = (req, res, next) => {
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
    next();
};
exports.loginPost = loginPost;
