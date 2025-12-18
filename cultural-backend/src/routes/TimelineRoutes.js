import express from "express";
import {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent,
} from "../controllers/timelineController.js";
import { requireAuth, requireAdmin } from "../middleware/authMiddleware.js";

const TimelineRouter = express.Router();

TimelineRouter.get("/", getEvents);
TimelineRouter.get("/:id", getEventById);
TimelineRouter.post("/", requireAuth, requireAdmin, createEvent);
TimelineRouter.put("/:id", requireAuth, requireAdmin, updateEvent);
TimelineRouter.delete("/:id", requireAuth, requireAdmin, deleteEvent);

export default TimelineRouter;
