import { Request, Response, response } from "express"
import User from "../../models/user.model";
import md5 from "md5";
import * as generateHelper from "../../helpers/generate";
import ForgotPassword from "../../models/forgot-password.model";
import { sendMail as sendMailHelper } from "../../helpers/sendMail";


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

// [GET] /user/password/forgot
export const forgotPassword = async (req, res: Response): Promise<void> => {
    res.render(`client/pages/user/otp-send`, {
        pageTitle: 'Forgot Password'
    });
}

// [POST] /user/password/forgot
export const forgotPasswordPost = async (req, res: Response): Promise<void> => {
    const { email } = req.body;

    const user = await User.findOne({
        email: email,
        deleted: false
    });

    if (!user) {
        req.flash('error', 'Email does not exist! Try again.');
        res.redirect('back');
        return;
    }

    // step 1: create a opt code and store to db
    const otp = generateHelper.generateRandomNumber(6);

    const forgotPasswordObject = {
        email,
        otp,
        expireAt: Date.now()
    }

    const forgotPassword = new ForgotPassword(forgotPasswordObject);
    await forgotPassword.save();

    // step 2: send otp code to user's mail
    const subject = `[Music-Streaming-Site] Your OTP code`;
    const html = `
    <p>A password recovery event has been triggered. Here is your otp code: <strong>${otp}</strong></p>
    <p>The OTP code is limited to 3 minutes.</p>
    <p>If you do not reset your password within 3 minutes, you will need to submit a new request.</p>
    `;

    sendMailHelper(email, subject, html);

    res.redirect(`/user/password/otp?email=${email}`);

}

// [GET] /user/password/otp
export const otpPassword = async (req: Request, res: Response): Promise<void> => {
    const { email } = req.query;

    res.render(`client/pages/user/otp-verify`, {
        pageTitle: 'Verify OTP',
        email
    });
}

// [POST] /user/password/otp
export const otpPasswordPost = async (req, res: Response): Promise<void> => {

    const { email, otp } = req.body;

    const doesExist = await ForgotPassword.findOne({
        email: email,
        otp: otp
    });

    if (!doesExist) {
        req.flash('error', 'Otp code is not valid! Try again.');
        res.redirect('back');
        return;
    }

    // return token for authorized user
    const user = await User.findOne({
        email: email,
        deleted: false
    });

    res.cookie('tokenUser', user.tokenUser);
    res.redirect(`/user/password/reset`);
}

// [GET] /user/password/reset
export const resetPassword = async (req: Request, res: Response): Promise<void> => {
    res.render(`client/pages/user/reset-password`, {
        pageTitle: 'Reset Password'
    })
}

// [POST] /user/password/reset
export const resetPasswordPost = async (req, res: Response): Promise<void> => {
    const { password } = req.body;

    const user = await User.findOne({
        tokenUser: req.cookies.tokenUser,
    });

    if (!user) {
        res.redirect('back');
        return;
    }

    await User.updateOne({
        _id: user.id
    }, {
        password: md5(password)
    });

    req.flash('success', 'You password was reset successfully!');
    res.redirect('/');

}