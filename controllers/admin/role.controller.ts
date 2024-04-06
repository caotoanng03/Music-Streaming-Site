import { Request, Response } from "express";
import Role from "../../models/role.model";
import { systemConfig } from "../../config/config";
import { stringify } from "querystring";

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

// [GET] /admin/roles/edit/:id
export const edit = async (req: Request, res: Response): Promise<void> => {
    const roleID = `${req.params.id}`;

    try {
        const role = await Role.findOne({
            _id: roleID,
            deleted: false
        });

        res.render(`admin/pages/roles/edit`, {
            pageTitle: `Edit Role Group ${role.title}`,
            role
        })
    } catch (error) {
        //  TODO: redirect to 404 page
        res.redirect(`/${systemConfig.prefixAdmin}/roles`)
    }


}

// [PATCH] /admin/roles/edit/:id
export const editPatch = async (req: Request, res: Response): Promise<void> => {
    const roleID = `${req.params.id}`;

    interface RoleInter {
        title: string,
        description?: string
    }

    const roleData: RoleInter = {
        title: req.body.title
    }

    if (req.body.desc) {
        roleData['description'] = req.body.desc;
    }

    await Role.updateOne({
        _id: roleID,
        deleted: false
    }, roleData);

    res.redirect(`/${systemConfig.prefixAdmin}/roles`);
}

