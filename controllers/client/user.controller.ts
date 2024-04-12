import { Request, Response } from "express"


// [GET] /user/register
export const register = async (req: Request, res: Response) => {
    res.render('client/pages/user/index', {
        pageTitle: 'Register/ Login'
    });

}