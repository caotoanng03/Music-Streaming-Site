import { Router } from "express";
import multer from "multer";

const router: Router = Router();
const upload = multer();

import * as uploadCloud from "../../middlewares/admin/uploadCloud.middleware";
import * as controller from "../../controllers/admin/singer.controller";
import * as validate from "../../validates/admin/singer.validate";

router.get('/', controller.index);

router.get('/create', controller.create);

router.post(
    '/create',
    upload.single("avatar"),
    uploadCloud.uploadSingle,
    validate.createPost,
    controller.createPost
);

router.get('/edit/:id', controller.edit);

router.patch(
    '/edit/:id',
    upload.single('avatar'),
    uploadCloud.uploadSingle,
    validate.createPost,
    controller.editPatch
)

router.delete('/delete/:id', controller.deleteSinger);

router.get('/detail/:id', controller.detail);


export const singerRoutes: Router = router;