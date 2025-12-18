import express from "express";
import {
  createHeritage,
  getHeritage,
  getHeritageById,
  updateHeritage,
  deleteHeritage,
} from "../controllers/heritageController.js";
import { requireAuth, requireAdmin } from "../middleware/authMiddleware.js";
const heritageRouter = express.Router();

heritageRouter.get("/", getHeritage);
heritageRouter.get("/:id", getHeritageById);

heritageRouter.post("/", requireAuth, requireAdmin, createHeritage);
heritageRouter.put("/:id", requireAuth, requireAdmin, updateHeritage);
heritageRouter.delete("/:id", requireAuth, requireAdmin, deleteHeritage);

export default heritageRouter;
