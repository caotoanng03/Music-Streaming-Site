"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPost = void 0;
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
    next();
};
exports.createPost = createPost;
