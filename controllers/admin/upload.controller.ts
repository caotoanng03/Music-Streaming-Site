import { Request, Response } from "express"

// [POST] /admin/upload
export const index = async (req, res: Response): Promise<void> => {
    res.json({
        location: req.body.file
    });
};