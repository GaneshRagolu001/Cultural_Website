import express from "express";
import { register, login, getProfile } from "../controllers/authcontroller.js";
import { requireAuth } from "../middleware/authMiddleware.js";
export const authrouter = express.Router();

authrouter.post("/register", register);

authrouter.post("/login", login);

authrouter.get("/profile", requireAuth, getProfile);

authrouter.post("/logout", (req, res) => {
  res.clearCookie("JWT");
  res.json({ message: "Logged out successfully" });
});
