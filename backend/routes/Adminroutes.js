import express from "express";
import {
  getStats,
  getAllUsers,
  getAllSessions,
  adjustWallet,
  deleteUser,
} from "../controller/Admincontroller.js";
import { isAdmin } from "../middleware/isAdmin.js";

const router = express.Router();

router.use(isAdmin);

router.get("/stats", getStats);
router.get("/users", getAllUsers);
router.get("/sessions", getAllSessions);
router.patch("/wallet/adjust", adjustWallet);
router.delete("/user/:id", deleteUser);

export default router;