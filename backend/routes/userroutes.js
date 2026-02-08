import express from "express";
import {
  changepassword,
  forgetpassword,
  login,
  logout,
  register,
  verifiction,
  verifyOTP,
} from "../controller/usercontroller.js";
import { isAuthentication } from "../middleware/isAuthenticated.js";
import { userschema, validateuser } from "../validator/Uservalidator.js";

const route = express.Router();
route.use(express.json());

route.post("/register", validateuser, register);
route.post("/verify-email", verifiction);
route.post("/login", login);
route.post("/forgetpassword", forgetpassword);
route.post("/verifyOTP", verifyOTP);
route.post("/changepass", changepassword);
route.post("/logout", isAuthentication, logout);

export default route;
