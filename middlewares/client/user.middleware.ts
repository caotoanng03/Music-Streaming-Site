import { Request, Response, NextFunction } from "express";
import User from "../../models/user.model";

export const userInfo = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    if (req.cookies.tokenUser) {
        const user = await User.findOne({
            tokenUser: req.cookies.tokenUser,
            deleted: false,
            status: 'active'
        }).select('-password');

        if (user) {
            res.locals.user = user;
        } else {
            res.clearCookie('tokenUser');
        }

    }

    next();
}