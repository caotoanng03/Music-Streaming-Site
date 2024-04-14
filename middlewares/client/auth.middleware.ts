import User from "../../models/user.model";

export const requireAuth = async (req, res, next) => {
    if (!req.cookies.tokenUser) {
        res.redirect(`/user/login`);
        return;
    }

    const user = await User.findOne({
        tokenUser: req.cookies.tokenUser
    });

    if (!user) {
        res.redirect(`/user/login`);
        return;
    }

    next();
};