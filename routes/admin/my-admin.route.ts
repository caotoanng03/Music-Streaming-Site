import { Router } from "express";
import multer from "multer";
const router: Router = Router();

import * as controller from "../../controllers/admin/my-admin.controller";
import * as uploadCloud from "../../middlewares/admin/uploadCloud.middleware";
import * as validate from "../../validates/admin/my-admin.validate";

const upload = multer();

router.get('/', controller.index);

router.get('/edit', controller.edit);

router.patch('/edit',
    upload.single('avatar'),
    uploadCloud.uploadSingle,
    validate.editPatch,
    controller.editPatch
);

export const myAdminRoutes: Router = router;

