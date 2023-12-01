import { Router } from "express"
const router: Router = Router();

import * as controller from "../../controllers/client/song.controller";

router.get("/:slugGenre", controller.list);

router.get("/detail/:songSlug", controller.detail);

router.patch("/like/:typeLike/:songId", controller.like);

export const songRoutes: Router = router;