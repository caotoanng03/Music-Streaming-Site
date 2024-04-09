import { Request, Response } from "express";
import Account from "../../models/account.model";
import Role from "../../models/role.model";
import md5 from "md5"
import { systemConfig } from "../../config/config";

// [GET] /admin/accounts
export const index = async (req: Request, res: Response): Promise<void> => {
    if (!res.locals.role.permissions.includes('accounts_view')) {
        res.sendStatus(400);
        return;
    }

    const accounts = await Account.find({
        deleted: false
    }).select('-password -token');

    for (const account of accounts) {
        const role = await Role.findOne({
            _id: account.roleId,
            deleted: false
        }).select('title');

        account['role'] = role;
    };

    res.render(`admin/pages/accounts/index`, {
        pageTitle: "Admin Account Management",
        accounts
    })
}

// [GET] /admin/accounts/create
export const create = async (req: Request, res: Response): Promise<void> => {
    if (!res.locals.role.permissions.includes('accounts_create')) {
        res.sendStatus(400);
        return;
    }

    const roles = await Role.find({
        deleted: false
    }).select('title');

    res.render(`admin/pages/accounts/create`, {
        pageTitle: "New Admin Account",
        roles
    })
}

// [POST] /admin/accounts/create
export const createPost = async (req: Request, res: Response): Promise<void> => {
    if (!res.locals.role.permissions.includes('accounts_create')) {
        res.sendStatus(400);
        return;
    }

    interface AccountInter {
        fullName: string,
        email: string,
        password: string,
        phone?: string,
        avatar: string,
        roleId: string,
        status: string
    }

    let avatar = "";
    if (req.body.avatar) {
        avatar = req.body.avatar;
    }


    const accountData: AccountInter = {
        fullName: req.body.fullName,
        email: req.body.email,
        password: md5(req.body.password),
        phone: req.body.phone,
        avatar: avatar,
        roleId: req.body.roleId,
        status: req.body.status
    }

    const newAccount = new Account(accountData);
    await newAccount.save();

    res.redirect(`/${systemConfig.prefixAdmin}/accounts`);
}

// [GET] /admin/accounts/edit/:id
export const edit = async (req: Request, res: Response): Promise<void> => {
    if (!res.locals.role.permissions.includes('accounts_edit')) {
        res.sendStatus(400);
        return;
    }

    const accountId: string = `${req.params.id}`;

    try {
        const account = await Account.findOne({
            _id: accountId,
            deleted: false
        }).select('-password -token');

        const roles = await Role.find({ deleted: false });

        res.render(`admin/pages/accounts/edit`, {
            pageTitle: `Edit Admin Account`,
            account,
            roles
        });

    } catch (error) {
        //TODO: redirect to 404 page
        res.redirect(`/${systemConfig.prefixAdmin}/accounts`)
    }
}

// [PATCH] /admin/accounts/edit/:id
export const editPatch = async (req: Request, res: Response): Promise<void> => {
    if (!res.locals.role.permissions.includes('accounts_edit')) {
        res.sendStatus(400);
        return;
    }

    const accountId: string = `${req.params.id}`;

    interface AccountInter {
        fullName: string,
        email: string,
        password?: string,
        phone?: string,
        avatar?: string,
        roleId: string,
        status: string
    }

    const accountData: AccountInter = {
        fullName: req.body.fullName,
        email: req.body.email,
        phone: req.body.phone,
        roleId: req.body.roleId,
        status: req.body.status
    }

    if (req.body.avatar) {
        accountData['avatar'] = req.body.avatar;
    }

    if (req.body.password) {
        accountData['password'] = md5(req.body.password);
    }

    await Account.updateOne({
        _id: accountId,
        deleted: false
    }, accountData);

    res.redirect(`/${systemConfig.prefixAdmin}/accounts`);
}

// [DELETE] /admin/accounts/delete/:id
export const deleteAccount = async (req: Request, res: Response): Promise<void> => {
    if (!res.locals.role.permissions.includes('accounts_delete')) {
        res.sendStatus(400);
        return;
    }

    const accountId: string = `${req.params.id}`;

    await Account.updateOne({
        _id: accountId,
        deleted: false
    }, {
        deleted: true
    });

    res.redirect(`back`);
}

// [GET] /admin/accounts/detail/:id
export const detail = async (req: Request, res: Response): Promise<void> => {
    if (!res.locals.role.permissions.includes('accounts_view')) {
        res.sendStatus(400);
        return;
    }

    const accountId: string = `${req.params.id}`;

    try {
        const account = await Account.findOne({
            _id: accountId,
            deleted: false
        }).select('-password -token');

        const role = await Role.findOne({
            _id: account.roleId,
            deleted: false
        }).select('title');

        account['role'] = role;

        res.render(`admin/pages/accounts/detail`, {
            pageTitle: "Admin Account Detail",
            account
        })

    } catch (error) {
        // TODO: redirect to 404 page
        res.redirect(`/${systemConfig.prefixAdmin}/accounts`)
    }
}