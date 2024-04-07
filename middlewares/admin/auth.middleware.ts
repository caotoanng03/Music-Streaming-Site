import { Request, Response, NextFunction } from "express";
import { systemConfig } from "../../config/config";
import Account from "../../models/account.model";

export const requireAuth = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    if (!req.cookies.token) {
        res.redirect(`/${systemConfig.prefixAdmin}/auth/login`);
        return;
    }

    const account = await Account.findOne({
        token: req.cookies.token,
        deleted: false,
        status: 'active'
    });

    if (!account) {
        res.redirect(`/${systemConfig.prefixAdmin}/auth/login`);
        return;
    }

    next();

}