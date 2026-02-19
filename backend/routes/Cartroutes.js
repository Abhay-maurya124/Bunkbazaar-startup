import express from "express";
import {
  addtocart,
  allcartitem,
  clearcart,
  getsinglecartitem,
  removefromcart,
  updatecart,
} from "../controller/Cartcontroller.js";
import { isAuthentication } from "../middleware/isAuthenticated.js";

const cartroute = express.Router();

cartroute.use(express.json());

cartroute.post("/cart/additem", isAuthentication, addtocart);
cartroute.get("/cart/getallitem", isAuthentication, allcartitem);
cartroute.get("/cart/getsingleitem/:id", isAuthentication, getsinglecartitem);
cartroute.delete("/cart/clearall", isAuthentication, clearcart);
cartroute.delete("/cart/removefromcart/:id", isAuthentication, removefromcart);
cartroute.patch("/cart/updatecart/:id",isAuthentication,updatecart)
export default cartroute;
