"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPost = void 0;
const createPost = (req, res, next) => {
    if (!req.body.title) {
        req.flash('error', 'Title can not be empty!');
        res.redirect('back');
        return;
    }
    if (req.body.title.length < 5) {
        req.flash('error', 'Title length must be at least 5 characters!');
        res.redirect('back');
        return;
    }
    next();
};
exports.createPost = createPost;
