import { Request, Response } from "express";
import Role from "../../models/role.model";
import { systemConfig } from "../../config/config";

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

// [GET] /admin/roles/create
export const create = async (req: Request, res: Response): Promise<void> => {

    res.render(`admin/pages/roles/create`, {
        pageTitle: "New Role Group"
    })
}

// [POST] /admin/roles/create
export const createPost = async (req: Request, res: Response): Promise<void> => {
    interface RoleInter {
        title: string
        description: string
    }

    let desc = "";
    if (req.body.desc) {
        desc = req.body.desc;
    }

    const roleData: RoleInter = {
        title: req.body.title,
        description: desc
    }

    const newRole = new Role(roleData);
    await newRole.save()

    res.redirect(`/${systemConfig.prefixAdmin}/roles`)
}