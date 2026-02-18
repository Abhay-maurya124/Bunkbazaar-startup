import express from "express";
import {
  addtocart,
  allcartitem,
  clearcart,
  removefromcart,
} from "../controller/Cartcontroller.js";
import { isAuthentication } from "../middleware/isAuthenticated.js";

const cartroute = express.Router();

cartroute.use(express.json());

cartroute.post("/cart/additem", isAuthentication, addtocart);
cartroute.get("/cart/getallitem", isAuthentication, allcartitem);
cartroute.delete("/cart/clearall", isAuthentication, clearcart);
cartroute.delete("/cart/removefrom/:id", isAuthentication, removefromcart);

export default cartroute;
