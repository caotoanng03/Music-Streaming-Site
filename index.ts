import express, { Express, Request, Response} from "express";
import dotenv from "dotenv";
import * as database from "./config/database";
import Genre from "./models/genre.model";


dotenv.config();
database.connect();

const app: Express = express();
const port: string | number = process.env.PORT || 8000;

// Template engine
app.set("views", "./views");
app.set("view engine", "pug");

// Client Routes
app.get("/genres", async (req: Request, res: Response): Promise<void> => {

    const genres = await Genre.find({ deleted: false });
    console.log(genres);

    res.render("client/pages/genres/index");
});


app.listen(port, () => {
    console.log(`app listening on port ${port}`);
})



