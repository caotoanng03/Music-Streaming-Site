import { Request, Response } from "express";
import Role from "../../models/role.model";
import { systemConfig } from "../../config/config";

// [GET] /admin/roles
export const index = async (req: Request, res: Response): Promise<void> => {
    if (!res.locals.role.permissions.includes('roleGroups_view')) {
        res.sendStatus(400);
        return;
    }

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
    if (!res.locals.role.permissions.includes('roleGroups_create')) {
        res.sendStatus(400);
        return;
    }

    res.render(`admin/pages/roles/create`, {
        pageTitle: "New Role Group"
    })
}

// [POST] /admin/roles/create
export const createPost = async (req, res: Response): Promise<void> => {
    if (!res.locals.role.permissions.includes('roleGroups_create')) {
        res.sendStatus(400);
        return;
    }

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

    req.flash('success', 'New role group was created successfully');
    res.redirect(`/${systemConfig.prefixAdmin}/roles`)
}

// [GET] /admin/roles/edit/:id
export const edit = async (req: Request, res: Response): Promise<void> => {
    if (!res.locals.role.permissions.includes('roleGroups_edit')) {
        res.sendStatus(400);
        return;
    }

    const roleID: string = `${req.params.id}`;

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
export const editPatch = async (req, res: Response): Promise<void> => {
    if (!res.locals.role.permissions.includes('roleGroups_edit')) {
        res.sendStatus(400);
        return;
    }

    const roleID: string = `${req.params.id}`;

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

    req.flash('success', 'The role group was updated successfully');
    res.redirect(`/${systemConfig.prefixAdmin}/roles`);
}

// [DELETE] /admin/roles/delete/:id
export const deleteRole = async (req, res: Response): Promise<void> => {
    if (!res.locals.role.permissions.includes('roleGroups_delete')) {
        res.sendStatus(400);
        return;
    }

    const roleID: string = `${req.params.id}`;

    try {

        await Role.updateOne({
            _id: roleID
        }, {
            deleted: true
        });

        req.flash('success', 'The role group was deleted successfully');
        res.redirect(`back`)

    } catch (error) {
        // TODO: redirect to 404 page
        res.redirect(`/${systemConfig.prefixAdmin}/roles`)
    }
}

// [GET] /admin/roles/detail/:id
export const detail = async (req: Request, res: Response): Promise<void> => {
    if (!res.locals.role.permissions.includes('roleGroups_view')) {
        res.sendStatus(400);
        return;
    }

    const roleID: string = `${req.params.id}`;

    try {

        const role = await Role.findOne({
            _id: roleID,
            deleted: false
        })

        res.render(`admin/pages/roles/detail`, {
            pageTitle: `Detail - ${role.title}`,
            role
        })

    } catch (error) {
        // TODO: redirect to 404 page
        res.redirect(`/${systemConfig.prefixAdmin}/roles`)
    }
}

// [GET] /admin/roles/permissions
export const permissions = async (req: Request, res: Response): Promise<void> => {
    if (!res.locals.role.permissions.includes('roles_permissions')) {
        res.sendStatus(400);
        return;
    }

    const roles = await Role.find({
        deleted: false
    });

    res.render(`admin/pages/roles/permissions`, {
        pageTitle: "Access Controls Panel",
        roles
    })
}

// [PATCH] /admin/roles/permissions
export const permissionsPatch = async (req, res: Response): Promise<void> => {
    if (!res.locals.role.permissions.includes('roles_permissions')) {
        res.sendStatus(400);
        return;
    }

    const permissions = JSON.parse(req.body.permissions);

    for (const item of permissions) {
        await Role.updateOne({
            _id: item.id
        }, {
            permissions: item.permissions
        });
    }

    req.flash('success', 'Changes applied successfully.');
    res.redirect(`back`);
}