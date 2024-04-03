import express, { Express } from "express";
import dotenv from "dotenv";
import path from "path";
import methodOverride from "method-override";
import * as database from "./config/database";

import adminRoutes from "./routes/admin/index.route";
import clientRoutes from "./routes/client/index.route";

import { systemConfig } from "./config/config";

dotenv.config();
database.connect();

const app: Express = express();
const port: string | number = process.env.PORT || 8000;

// Static files
app.use(express.static(`${__dirname}/public`));

// body-parser alternatively
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Template engine
app.set("views", `${__dirname}/views`);
app.set("view engine", "pug");

// Method override
app.use(methodOverride("_method"));

// TinyMCE
app.use(
    "/tinymce",
    express.static(path.join(__dirname, "node_modules", "tinymce"))
);

// App local varialbles
app.locals.prefixAdmin = systemConfig.prefixAdmin;

// Admin Routes
adminRoutes(app);
// Client Routes
clientRoutes(app);

app.listen(port, () => {
    console.log(`app listening on port ${port}`);
})



