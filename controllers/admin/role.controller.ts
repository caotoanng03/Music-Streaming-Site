import { Request, Response } from "express";
import Role from "../../models/role.model";

// [GET] /admin/roles
export const index = async (req: Request, res: Response): Promise<void> => {
    const roles = await Role.find({
        deleted: false
    }) || [];

    res.render(`admin/pages/roles/index`, {
        pageTitle: "Role Group Management",
        roles
    })
}