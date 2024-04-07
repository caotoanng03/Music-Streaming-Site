import { Request, Response } from "express";
import Account from "../../models/account.model";
import md5 from "md5";
import { systemConfig } from "../../config/config";
import Role from "../../models/role.model";

// [GET] /admin/auth/login
export const login = async (req: Request, res: Response): Promise<void> => {
    // `${}` is not ok here cause if token is empty, return 'undefine', then if(token) -> true
    const token = req.cookies.token;

    if (!token) {
        res.render(`admin/pages/auth/login`, {
            pageTitle: "Log In"
        });
        return;
    }

    const account = await Account.findOne({
        token: token,
        deleted: false,
        status: 'active'
    }).select('-password -token');

    const role = await Role.findOne({
        _id: account.roleId,
        deleted: false
    }).select('permissions');

    if (!account || role.permissions.length == 0) {
        res.render(`admin/pages/auth/login`, {
            pageTitle: "Log In"
        });
        return;
    }

    res.redirect(`/${systemConfig.prefixAdmin}/dashboard`);

}

// [POST] /admin/auth/login
export const loginPost = async (req, res: Response): Promise<void> => {
    const email: string = `${req.body.email}`;
    const password: string = `${req.body.password}`;

    const account = await Account.findOne({
        email: email
    });

    if (!account) {
        req.flash('error', 'Email is invalid!');
        res.redirect(`back`);
        return;
    }

    if (md5(password) !== account.password) {
        req.flash('error', 'Password is incorrect!')
        res.redirect(`back`);
        return;
    }

    if (account.status == 'inactive') {
        req.flash('error', 'This account is currently inactive!')
        res.redirect(`back`);
        return;
    }

    res.cookie('token', account.token);
    res.redirect(`/${systemConfig.prefixAdmin}/dashboard`);
}

// [GET] /admin/auth/logout
export const logout = async (req, res: Response): Promise<void> => {
    res.clearCookie('token');

    res.redirect(`/${systemConfig.prefixAdmin}`);
}
