import { Request, Response } from "express"
import User from "../../models/user.model";

// [GET] /user/profile
export const profile = async (req: Request, res: Response): Promise<void> => {
    res.render('client/pages/user/profile', {
        pageTitle: 'Profile'
    })
}

// [GET] /user/profile/edit
export const editProfile = async (req: Request, res: Response): Promise<void> => {
    res.render('client/pages/user/profile-edit', {
        pageTitle: 'Edit Profile'
    });
}

// [POST] /user/profile/edit
export const editProfilePost = async (req, res: Response): Promise<void> => {
    const { fullName, email } = req.body;

    interface ProfileInter {
        fullName: string,
        email: string,
        phone?: string,
        avatar?: string
    }

    const profileData: ProfileInter = {
        fullName,
        email,
    }

    if (req.body.phone) {
        profileData['phone'] = req.body.phone;
    }

    if (req.body.avatar) {
        profileData['avatar'] = req.body.avatar;
    }

    await User.updateOne({
        tokenUser: req.cookies.tokenUser
    }, profileData);

    req.flash('success', 'Profile updated successfully!');
    res.redirect('/user/profile');
}