import express from "express";
import {
  addtocart,
  allcartitem,
  clearcart,
  getsinglecartitem,
  removefromcart,
  updatecart,
} from "../controller/Cartcontroller.js";

const cartroute = express.Router();
cartroute.use(express.json());
cartroute.post("/cart/additem", addtocart);
cartroute.post("/cart/clearall", clearcart);
cartroute.put("/cart/updateitem/:id", updatecart);
cartroute.delete("/cart/removefrom/:id", removefromcart);
cartroute.get("/cart/singlecartitem/:id", getsinglecartitem);
cartroute.get("/cart/getallitem", allcartitem);
export default cartroute;