import express, { Express } from "express";
import dotenv from "dotenv";
import * as database from "./config/database";


dotenv.config();
database.connect();

const app: Express = express();
const port: string | number = process.env.PORT || 8000;


app.listen(port, () => {
    console.log(`app listening on port ${port}`);
})



