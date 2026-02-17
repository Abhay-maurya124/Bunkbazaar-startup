import express from "express";
import {
  changepassword,
  forgetpassword,
  getcart,
  handleCart,
  login,
  logout,
  payment,
  register,
  verifiction,
  verifyOTP,
} from "../controller/usercontroller.js";
import { isAuthentication } from "../middleware/isAuthenticated.js";
import { validateuser } from "../validator/Uservalidator.js";

const route = express.Router();
route.use(express.json());

route.post("/register", validateuser, register);
route.post("/verify-email/:token", verifiction);
route.post("/login", login);
route.post("/forgetpassword", forgetpassword);
route.post("/verifyOTP", verifyOTP);
route.post("/payment", payment);
route.post("/changepass", changepassword);
route.post("/logout", isAuthentication, logout);
route.post("/cartitem", isAuthentication, handleCart);
route.get("/getcart", isAuthentication, getcart);
export default route;
