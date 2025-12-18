import express from "express";
import { requireAuth, requireAdmin } from "../middleware/authMiddleware.js";
import { generateQrForHeritage } from "../controllers/qrcodeController.js";

const QrRouter = express.Router();

QrRouter.get("/:id", requireAuth, requireAdmin, generateQrForHeritage);

export default QrRouter;
