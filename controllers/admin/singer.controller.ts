import { Request, Response } from "express";
import Singer from "../../models/singer.model";
import { systemConfig } from "../../config/config";
import Song from "../../models/song.model";


// [GET] /admin/singers
export const index = async (req: Request, res: Response): Promise<void> => {
    if (!res.locals.role.permissions.includes('singers_view')) {
        res.sendStatus(400);
        return;
    }

    const singers = await Singer.find({
        deleted: false
    });

    res.render(`admin/pages/singers/index`, {
        pageTitle: "Singer Management",
        singers
    })
};

// [GET] /admin/singers/create
export const create = async (req: Request, res: Response): Promise<void> => {
    if (!res.locals.role.permissions.includes('singers_create')) {
        res.sendStatus(400);
        return;
    }

    res.render(`admin/pages/singers/create`, {
        pageTitle: "New Singer"
    })
};

// [POST] /admin/singers/create
export const createPost = async (req, res: Response): Promise<void> => {
    if (!res.locals.role.permissions.includes('singers_create')) {
        res.sendStatus(400);
        return;
    }

    interface SingerInter {
        fullName: string,
        avatar: string,
        status: string
    };

    let avatar = "";
    if (req.body.avatar) {
        avatar = req.body.avatar;
    }

    const singerData: SingerInter = {
        fullName: req.body.fullName,
        avatar: avatar,
        status: req.body.status
    }

    const singer = new Singer(singerData);
    await singer.save();

    req.flash('success', 'New singer was created successfully.');
    res.redirect(`/${systemConfig.prefixAdmin}/singers`);

}

// [GET] /admin/singers/edit/:id
export const edit = async (req: Request, res: Response): Promise<void> => {
    if (!res.locals.role.permissions.includes('singers_edit')) {
        res.sendStatus(400);
        return;
    }

    const singerID: string = `${req.params.id}`;
    try {
        const singer = await Singer.findOne({
            _id: singerID,
            deleted: false
        })

        res.render(`admin/pages/singers/edit`, {
            pageTitle: "Edit Singer",
            singer
        })
    } catch (error) {
        // 404 page
        res.render('errors/404', {
            pageTitle: '404 Not Found'
        });
    }
}

// [PATCH] /admin/singers/edit/:id
export const editPatch = async (req, res: Response): Promise<void> => {
    if (!res.locals.role.permissions.includes('singers_edit')) {
        res.sendStatus(400);
        return;
    }

    const singerID: string = `${req.params.id}`;

    interface singerInter {
        fullName: string
        avatar?: string
        status: string
    }

    const singerData: singerInter = {
        fullName: req.body.fullName,
        status: req.body.status
    }

    if (req.body.avatar) {
        singerData["avatar"] = req.body.avatar
    }

    try {
        await Singer.updateOne({
            _id: singerID,
            deleted: false
        }, singerData);

        req.flash('success', 'The singer was updated successfully.');
        res.redirect(`/${systemConfig.prefixAdmin}/singers`);
    } catch (error) {
        // 404 page
        res.render('errors/404', {
            pageTitle: '404 Not Found'
        });
    }
}

// [DELETE] /admin/singers/delete/:id
export const deleteSinger = async (req, res: Response): Promise<void> => {
    if (!res.locals.role.permissions.includes('singers_delete')) {
        res.sendStatus(400);
        return;
    }

    const singerId: string = `${req.params.id}`;

    try {
        await Singer.updateOne({
            _id: singerId,
            deleted: false
        }, {
            deleted: true
        })

        req.flash('success', 'The singer was deleted successfully.');
        res.redirect(`back`);
    } catch (error) {
        // 404 page
        res.render('errors/404', {
            pageTitle: '404 Not Found'
        });
    }
}

// [GET] /admin/singers/detail/:id
export const detail = async (req: Request, res: Response): Promise<void> => {
    if (!res.locals.role.permissions.includes('singers_view')) {
        res.sendStatus(400);
        return;
    }

    const singerID: string = `${req.params.id}`;

    try {
        const singer = await Singer.findOne({
            _id: singerID,
            deleted: false
        })

        const totalSongs = await Song.countDocuments({
            singerId: singerID,
            deleted: false
        });

        singer['totalSongs'] = totalSongs || 0;

        res.render(`admin/pages/singers/detail`, {
            pageTitle: `Singer Details`,
            singer
        })

    } catch (error) {
        // 404 page
        res.render('errors/404', {
            pageTitle: '404 Not Found'
        });
    }


}