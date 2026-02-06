import express from "express";
import {
  forgetpassword,
  login,
  logout,
  register,
  verifiction,
  verifyOTP,
} from "../controller/usercontroller.js";
import { isAuthentication } from "../middleware/isAuthenticated.js";

const route = express.Router();
route.use(express.json());

route.post("/register", register);
route.post("/verify", verifiction);
route.post("/login", login);
route.post("/forgetpassword", forgetpassword);
route.post("/verifyOTP", verifyOTP);
route.post("/logout", isAuthentication, logout);

export default route;
