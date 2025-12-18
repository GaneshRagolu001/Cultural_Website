import express from "express";
import {
  submitStory,
  getApprovedStories,
  getPendingStories,
  approveStory,
  rejectStory,
} from "../controllers/storyController.js";
import { requireAuth, requireAdmin } from "../middleware/authMiddleware.js";
const storyRouter = express.Router();

storyRouter.post("/", requireAuth, submitStory);
storyRouter.get("/approved", getApprovedStories);
storyRouter.get("/pending", requireAuth, requireAdmin, getPendingStories);
storyRouter.put("/approve/:id", requireAuth, requireAdmin, approveStory);
storyRouter.put("/reject/:id", requireAuth, requireAdmin, rejectStory);

export default storyRouter;
