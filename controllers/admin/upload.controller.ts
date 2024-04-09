import { Request, Response } from "express"

// tiny-mce
// [POST] /admin/upload
export const index = async (req, res: Response): Promise<void> => {
    res.json({
        location: req.body.file
    });
};