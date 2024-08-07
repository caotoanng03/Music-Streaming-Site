import { Request, Response } from "express"
import Account from "../../models/account.model";
import { systemConfig } from "../../config/config";
import Role from "../../models/role.model";

// [GET] /admin/my-admin
export const index = async (req: Request, res: Response): Promise<void> => {
    res.render(`admin/pages/my-admin/index`, {
        pageTitle: 'Admin Information'
    })
}

// [GET] /admin/my-admin/edit
export const edit = async (req, res: Response): Promise<void> => {
    const roles = await Role.find({
        deleted: false
    });

    res.render(`admin/pages/my-admin/edit`, {
        pageTitle: 'Edit Admin Profile',
        roles
    })
}

// [PATCH] /admin/my-admin/edit
export const editPatch = async (req, res: Response): Promise<void> => {
    const admin = res.locals.admin;
    const permissions = res.locals.role.permissions;

    const email: string = req.body.email;

    const alreadyExistedAccount = await Account.find({
        email: email,
        deleted: false,
    });

    if (alreadyExistedAccount.length === 1 && email !== admin.email) {
        req.flash('error', 'This email already existed!');
        res.redirect('back');
        return;
    }

    interface AccountInter {
        fullName: string,
        email: string,
        phone?: string,
        avatar?: string
    }

    const AccountData: AccountInter = {
        fullName: req.body.fullName,
        email: req.body.email,
    }

    if (req.body.avatar) {
        AccountData['avatar'] = req.body.avatar;
    }

    if (req.body.phone) {
        AccountData['phone'] = req.body.phone;
    }

    if (permissions.includes('roles_permissions')) {
        if (req.body.roleId) {
            AccountData['roleId'] = req.body.roleId
        }

        if (req.body.status) {
            AccountData['status'] = req.body.status;
        }
    }

    await Account.updateOne({
        _id: admin.id,
        deleted: false
    }, AccountData)

    req.flash('success', 'Updated Successfully!');
    res.redirect(`/${systemConfig.prefixAdmin}/my-admin`);
}