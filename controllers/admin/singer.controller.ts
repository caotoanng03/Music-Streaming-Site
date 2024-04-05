import { Request, Response } from "express";
import Singer from "../../models/singer.model";
import { systemConfig } from "../../config/config";


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

// [GET] /admin/singers/create
export const create = async (req: Request, res: Response): Promise<void> => {

    res.render(`admin/pages/singers/create`, {
        pageTitle: "New Singer"
    })
};

// [POST] /admin/singers/create
export const createPost = async (req: Request, res: Response): Promise<void> => {
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

    res.redirect(`/${systemConfig.prefixAdmin}/singers`);

}

// [GET] /admin/singers/edit/:id
export const edit = async (req: Request, res: Response): Promise<void> => {
    const singerID = `${req.params.id}`;
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
        //TODO: redirect to 404 page
        res.redirect(`/${systemConfig.prefixAdmin}/singers`);
    }
}

// [PATCH] /admin/singers/edit/:id
export const editPatch = async (req: Request, res: Response): Promise<void> => {
    const singerID = `${req.params.id}`;

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


        res.redirect(`/${systemConfig.prefixAdmin}/singers`);
    } catch (error) {
        // TODO: redirect to 404 page
        res.redirect(`/${systemConfig.prefixAdmin}/singers`);
    }
}