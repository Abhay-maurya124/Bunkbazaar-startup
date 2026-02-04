import express from "express";
import { login, register, verifiction } from "../controller/usercontroller.js";
const route = express.Router();
route.use(express.json());

route.post("/register", register);
route.post("/verify", verifiction);
route.post("/login", login);

export default route;
