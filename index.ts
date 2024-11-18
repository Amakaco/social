import express, { Application } from "express";
import cors from "cors";
import env from "dotenv";

import { mainApp } from "./mainApp";
import { dbConfig } from "./utils/dbConfig";
env.config();

const port: number = parseInt(process.env.PORT as string);
const app: Application = express();
app.use(express.json());
app.use(cors());

mainApp(app);
app.listen(process.env.PORT, () => {
  dbConfig();
});
