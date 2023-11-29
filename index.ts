import express, { Express} from "express";
import dotenv from "dotenv";
import * as database from "./config/database";

import clientRoutes from "./routes/client/index.route";

dotenv.config();
database.connect();

const app: Express = express();
const port: string | number = process.env.PORT || 8000;

// Static files
app.use(express.static("public"));

// Template engine
app.set("views", "./views");
app.set("view engine", "pug");

// Client Routes
clientRoutes(app);

app.listen(port, () => {
    console.log(`app listening on port ${port}`);
})



