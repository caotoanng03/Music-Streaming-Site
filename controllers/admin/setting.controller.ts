import { Request, Response } from "express";
import SettingGeneral from "../../models/setting.model";

// [GET] /admin/settings/general
export const general = async (req: Request, res: Response) => {
    const settingGeneral = await SettingGeneral.findOne({});

    res.render('admin/pages/settings/general', {
        pageTitle: 'General Setting',
        settingGeneral: settingGeneral
    })
};

// [PATCH] /admin/settings/general
export const generalPatch = async (req, res: Response): Promise<void> => {

    const settingGeneral = await SettingGeneral.findOne({});

    if (settingGeneral) {

        await SettingGeneral.updateOne({
            _id: settingGeneral.id
        }, req.body);

    } else {
        const setting = new SettingGeneral(req.body);
        setting.save();
    }

    req.flash('success', 'Settings Updated');
    res.redirect('back');
};