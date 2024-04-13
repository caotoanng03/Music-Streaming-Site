import { Request, Response, response } from "express"
import User from "../../models/user.model";
import md5 from "md5";


// [GET] /user/register
export const register = async (req: Request, res: Response) => {
    res.render('client/pages/user/index', {
        pageTitle: 'Register/ Login'
    });

}

// [POST] /user/register
export const registerPost = async (req, res: Response): Promise<void> => {

    const email: string = req.body.email;

    const alreadyExistedUser = await User.findOne({
        // deleted: false
        email: email
    }).select("-password -token");

    if (alreadyExistedUser) {
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
        password: md5(req.body.password),
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

// [POST] /user/login
export const loginPost = async (req, res: Response): Promise<void> => {
    const { email, password } = req.body;

    const user = await User.findOne({
        email: email,
        deleted: false
    });

    if (!user) {
        req.flash('error', 'Email is incorrect! Try again.');
        res.redirect(`back`);
        return;
    }

    if (md5(password) !== user.password) {
        req.flash('error', 'Password is incorrect! Try again.');
        res.redirect(`back`);
        return;
    }

    if (user.status === 'inactive') {
        req.flash('error', 'The account is being banned! Please contact Admin.');
        res.redirect(`back`);
        return;
    }

    res.cookie('tokenUser', user.tokenUser);
    req.flash('success', 'Successfully logged in!');
    res.redirect('/');
}

// [GET] /user/logout
export const logout = async (req, res: Response): Promise<void> => {
    res.clearCookie('tokenUser');
    res.redirect('/');
}