import express from "express";
import { requireAuth, requireAdmin } from "../middleware/authMiddleware.js";
const adminRouter = express.Router();

adminRouter.get("/check", requireAuth, requireAdmin, (req, res) => {
  res.json({ message: "Admin verified", user: req.user });
});

export default adminRouter;
