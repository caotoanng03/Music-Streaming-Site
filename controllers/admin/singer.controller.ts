import { Request, Response } from "express";
import Singer from "../../models/singer.model";


// [GET] /admin/singers
export const index = async (req: Request, res: Response): Promise<void> => {
    const singers = await Singer.find({
        deleted: false
    });

    res.render(`admin/pages/singers/index`, {
        pageTitle: "Singers",
        singers
    })
};