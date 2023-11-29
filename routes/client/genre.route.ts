import { Express, Router, Request, Response } from "express";
const router: Router = Router();

import * as controller from "../../controllers/client/genre.controller";

router.get("/", controller.index);

export const genreRoutes: Router = router;