import { Request, Response } from "express";
import Song from "../../models/song.model";
import Singer from "../../models/singer.model";
import Account from "../../models/account.model";
import User from "../../models/user.model";

// [GET] /admin/dashboard
export const index = async (req: Request, res: Response): Promise<void> => {
    const statistic = {
        song: {
            total: 0,
            active: 0,
            inactive: 0,
        },
        singer: {
            total: 0,
            active: 0,
            inactive: 0,
        },
        account: {
            total: 0,
            active: 0,
            inactive: 0,
        },
        user: {
            total: 0,
            active: 0,
            inactive: 0,
        },
    };

    statistic.song.total = await Song.countDocuments({ deleted: false });
    statistic.song.active = await Song.countDocuments({ status: 'active' });
    statistic.song.inactive = await Song.countDocuments({ status: 'inactive' });

    statistic.singer.total = await Singer.countDocuments({ deleted: false });
    statistic.singer.active = await Singer.countDocuments({ status: 'active' });
    statistic.singer.inactive = await Singer.countDocuments({ status: 'inactive' });

    statistic.account.total = await Account.countDocuments({ deleted: false });
    statistic.account.active = await Account.countDocuments({ status: 'active' });
    statistic.account.inactive = await Account.countDocuments({ status: 'inactive' });

    statistic.user.total = await User.countDocuments({ deleted: false });
    statistic.user.active = await User.countDocuments({ status: 'active' });
    statistic.user.inactive = await User.countDocuments({ status: 'inactive' });

    res.render("admin/pages/dashboard/index", {
        pageTitle: "Dashboard",
        statistic
    });
};
