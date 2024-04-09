import { Request, Response } from "express";

// [GET] /admin/dashboard
export const index = async (req: Request, res: Response): Promise<void> => {
    if (res.locals.role.permissions.length <= 0) {
        res.sendStatus(400);
        return;
    }

    res.render("admin/pages/dashboard/index", {
        pageTitle: "Dashboard"
    });
};