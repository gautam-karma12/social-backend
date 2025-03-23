import express from "express";
import dotenv from "dotenv";
import Bootstrap from "./bootstrap.js";
dotenv.config();
const app = express();
app.set("port", process.env.PORT || 8080);
let bootstrap = new Bootstrap(app);
