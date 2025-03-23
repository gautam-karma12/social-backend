import { Router } from "express";
import authRoutes from "./authRoutes";
const router = Router();
const register = (app) => {
  app.use(router);
  router.use("/api", [authRoutes]);
};
export default register;
