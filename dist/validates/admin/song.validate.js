"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPost = void 0;
const createPost = (req, res, next) => {
    if (!req.body.title) {
        req.flash('error', 'Song title can not be empty!');
        res.redirect('back');
        return;
    }
    if (req.body.title.length < 5) {
        req.flash('error', 'Song title must be at least 5 letters!');
        res.redirect('back');
        return;
    }
    if (!req.body.topicId) {
        req.flash('error', 'Song genre must be choosen!');
        res.redirect('back');
        return;
    }
    if (!req.body.singerId) {
        req.flash('error', 'Song singer must be choosen!');
        res.redirect('back');
        return;
    }
    next();
};
exports.createPost = createPost;
