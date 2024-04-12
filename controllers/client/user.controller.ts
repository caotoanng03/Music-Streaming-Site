import { Request, Response } from "express"
import User from "../../models/user.model";


// [GET] /user/register
export const register = async (req: Request, res: Response) => {
    res.render('client/pages/user/index', {
        pageTitle: 'Register/ Login'
    });

}

// [POST] /user/register
export const registerPost = async (req, res: Response): Promise<void> => {

    const email: string = req.body.email;

    const alreadyExisted = await User.findOne({
        email: email
    }).select("-password -token");

    if (alreadyExisted) {
        req.flash('error', "An asociated email have linked to this email");
        return;
    }

    interface UserInter {
        fullName: string,
        email: string,
        password: string
        avatar?: string
        phone?: string
    }

    const userData: UserInter = {
        fullName: req.body.fullName,
        email: req.body.email,
        password: req.body.password,
    }


    if (req.body.avatar) {
        userData['avatar'] = req.body.avatar;
    }

    if (req.body.phone) {
        userData['phone'] = req.body.phone;
    }

    const newUser = await User.create(userData);
    await newUser.save();

    res.cookie('tokenUser', newUser.tokenUser);

    req.flash('success', 'You successfully registered new account!')
    res.redirect('/');

}