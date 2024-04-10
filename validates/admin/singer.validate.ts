import { Response, NextFunction } from "express";

export const createPost = (req, res: Response, next: NextFunction) => {
    if (!req.body.fullName) {
        req.flash('error', 'Name can not be empty!')
        res.redirect('back');
        return;
    }

    if (req.body.fullName.length < 5) {
        req.flash('error', 'Name must be at least 5 letters!');
        res.redirect('back');
        return;
    }

    next();
}