"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.editPatch = void 0;
const email_1 = require("../../helpers/email");
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
    next();
};
exports.editPatch = editPatch;
