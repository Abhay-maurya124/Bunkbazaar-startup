import express from "express";
import { register } from "../controller/usercontroller.js";
const route = express.Router();
route.use(express.json());

route.post("/", register);
route.use((req, res) => {

});


export default route;
