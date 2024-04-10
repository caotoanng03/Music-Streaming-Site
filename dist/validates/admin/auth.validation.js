"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginPost = void 0;
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
    next();
};
exports.loginPost = loginPost;
