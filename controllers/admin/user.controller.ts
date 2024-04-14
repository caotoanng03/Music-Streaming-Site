import { Request, Response } from "express";
import User from "../../models/user.model";
import md5 from "md5";
import { systemConfig } from "../../config/config";

// [GET] /admin/users
export const index = async (req: Request, res: Response): Promise<void> => {
    if (!res.locals.role.permissions.includes('users_view')) {
        res.sendStatus(400);
        return;
    }

    const users = await User.find({ deleted: false });

    res.render(`admin/pages/users/index`, {
        pageTitle: 'User Account Management',
        users
    });
}

// [GET] /admin/users/create
export const create = async (req: Request, res: Response): Promise<void> => {
    if (!res.locals.role.permissions.includes('users_create')) {
        res.sendStatus(400);
        return;
    }

    res.render(`admin/pages/users/create`, {
        pageTitle: 'New User Account'
    })
}

// [POST] /admin/users/create
export const createPost = async (req, res: Response): Promise<void> => {
    if (!res.locals.role.permissions.includes('users_create')) {
        res.sendStatus(400);
        return;
    }

    const { fullName, email, password, status } = req.body;

    interface UserInter {
        fullName: string,
        password: string,
        email: string,
        status: string
        avatar?: string,
        phone?: string
    }

    const userData: UserInter = {
        fullName,
        email,
        status,
        password: md5(password)
    }

    if (req.body.avatar) {
        userData["avatar"] = req.body.avatar;
    }

    if (req.body.phone) {
        userData["phone"] = req.body.phone;
    }

    const newUser = new User(userData);
    await newUser.save();

    req.flash('success', 'New user was just created!');
    res.redirect(`/${systemConfig.prefixAdmin}/users`);
}

// [GET] /admin/users/edit/:id
export const edit = async (req: Request, res: Response): Promise<void> => {
    if (!res.locals.role.permissions.includes('users_edit')) {
        res.sendStatus(400);
        return;
    }

    const id: string = req.params.id;

    try {
        const user = await User.findOne({
            _id: id,
            deleted: false
        }).select('-password -token');

        res.render(`admin/pages/users/edit`, {
            pageTitle: 'Edit User Account',
            user
        });

    } catch (error) {
        // 404 page
        res.render('errors/404', {
            pageTitle: '404 Not Found'
        });
    }
}

// [PATCH] /admin/users/edit/:id
export const editPatch = async (req, res: Response): Promise<void> => {
    if (!res.locals.role.permissions.includes('users_edit')) {
        res.sendStatus(400);
        return;
    }

    const userId: string = `${req.params.id}`;

    interface UserInter {
        fullName: string,
        email: string,
        password?: string,
        phone?: string,
        avatar?: string,
        status: string
    }

    const userData: UserInter = {
        fullName: req.body.fullName,
        email: req.body.email,
        phone: req.body.phone,
        status: req.body.status
    }

    if (req.body.avatar) {
        userData['avatar'] = req.body.avatar;
    }

    if (req.body.password) {
        userData['password'] = md5(req.body.password);
    }

    try {

        await User.updateOne({
            _id: userId,
            deleted: false
        }, userData);


        req.flash('success', 'The user account was updated successfully');
        res.redirect(`/${systemConfig.prefixAdmin}/users`);

    } catch (error) {

        // 404 page
        res.render('errors/404', {
            pageTitle: '404 Not Found'
        });
    }

}

// [DELETE] /admin/users/delete/:id
export const deleteUser = async (req, res: Response): Promise<void> => {
    if (!res.locals.role.permissions.includes('users_delete')) {
        res.sendStatus(400);
        return;
    }

    const userId: string = `${req.params.id}`;

    try {
        await User.updateOne({
            _id: userId,
            deleted: false
        }, {
            deleted: true
        });

        req.flash('success', 'The account was deleted successfully');
        res.redirect(`back`);
    } catch (error) {
        // 404 page
        res.render('errors/404', {
            pageTitle: '404 Not Found'
        });
    }



}

// [GET] /admin/users/detail/:id
export const detail = async (req, res: Response): Promise<void> => {
    if (!res.locals.role.permissions.includes('users_view')) {
        res.sendStatus(400);
        return;
    }

    const userId: string = req.params.id;

    try {
        const user = await User.findOne({
            _id: userId,
            deleted: false
        }).select('-password -token');

        res.render(`admin/pages/users/detail`, {
            pageTitle: 'User Account Detail',
            user
        })
    } catch (error) {
        // 404 page
        res.render('errors/404', {
            pageTitle: '404 Not Found'
        });
    }
}