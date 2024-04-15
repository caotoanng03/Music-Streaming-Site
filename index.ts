import express, { Express } from "express";
import dotenv from "dotenv";
import path from "path";
import flash from "express-flash"
import cookieParser from "cookie-parser"
import session from "express-session"
import methodOverride from "method-override";
import moment from "moment";
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

// Flash
app.use(cookieParser('ALITTLEBOZ'));
app.use(session({ cookie: { maxAge: 60000 } }));
app.use(flash());

// Method override
app.use(methodOverride("_method"));

// TinyMCE
app.use(
    "/tinymce",
    express.static(path.join(__dirname, "node_modules", "tinymce"))
);

// App local varialbles
app.locals.prefixAdmin = systemConfig.prefixAdmin;
app.locals.moment = moment;

// Admin Routes
adminRoutes(app);
// Client Routes
clientRoutes(app);
// 404 for unknown routes
app.get('*', (req, res) => {
    res.render('errors/404', {
        pageTitle: '404 Not Found'
    });
});

app.listen(port, () => {
    console.log(`app listening on port ${port}`);
})



