import bodyParser from "body-parser";
import express from "express";
import path from "path";
import cors from "cors";
import models from "./models";
import routes from "./routes/index";
export default class Bootstrap {
  constructor(app) {
    this.app = app;
    this.middleware();
    this.start();
    this.connectDb();
    this.routes();
  }
  middleware() {
    const { app } = this;
    app.use(cors())
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(express.static(path.join(__dirname, "public")));
    app.use('/uploads', express.static(path.join(__dirname, "../uploads")));
  }

  connectDb() {
    const { sequelize } = models;
    sequelize
      .authenticate()
      .then(() => {
        console.log("Db connection");
        sequelize
          .sync()
          .then(() => {
            console.log("sys success");
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log("Connection error", err);
      });
  }

  routes() {
    routes(this.app);
  }

  start() {
    const { app } = this;
    const port = app.get("port");
    const server = app.listen(port, () => {
      console.log("listening on port", port);
    });
  }
}
