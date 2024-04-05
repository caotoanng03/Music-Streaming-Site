import { Router } from "express";
import multer from "multer";

const router: Router = Router();
const upload = multer();

import * as uploadCloud from "../../middlewares/admin/uploadCloud.middleware";
import * as controller from "../../controllers/admin/singer.controller";

router.get('/', controller.index);

router.get('/create', controller.create);

router.post(
    '/create',
    upload.single("avatar"),
    uploadCloud.uploadSingle
    , controller.createPost);

export const singerRoutes: Router = router;