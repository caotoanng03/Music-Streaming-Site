import {Router} from "express";
const router: Router = Router();

import * as controller from "../../controllers/admin/genre.controller";

router.get("/", controller.index);

export const genreRoutes: Router = router;