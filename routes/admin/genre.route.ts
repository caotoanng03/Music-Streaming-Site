import { Router } from "express";
const router: Router = Router();
import multer from "multer";

const upload = multer();

import * as controller from "../../controllers/admin/genre.controller";

import * as uploadCloud from "../../middlewares/admin/uploadCloud.middleware";

router.get("/", controller.index);

router.get("/create", controller.create);

router.post(
    "/create",
    upload.single("avatar"),
    uploadCloud.uploadSingle,
    controller.createPost);

router.get("/edit/:id", controller.edit);

router.patch(
    "/edit/:id",
    upload.single("avatar"),
    uploadCloud.uploadSingle,
    controller.editPatch
)

router.delete("/delete/:id", controller.deleteGenre);

router.get("/detail/:id", controller.detail);

export const genreRoutes: Router = router;