import { Request, Response, NextFunction } from "express";
import SettingGeneral from "../../models/setting.model";

export const settingGeneral = async (req: Request, res: Response, next: NextFunction) => {
    const settingGeneral = await SettingGeneral.findOne({})

    res.locals.settingGeneral = settingGeneral;

    next();
};