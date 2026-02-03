import express from "express";
import { register, verifiction } from "../controller/usercontroller.js";
const route = express.Router();
route.use(express.json());

route.post("/register", register);
route.post("/verify", verifiction);

export default route;
