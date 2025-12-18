import express from "express";
import upload from "../middleware/uploadMiddleware.js";
import { uploadFile } from "../controllers/uploadController.js";
import { requireAuth } from "../middleware/authMiddleware.js";

const uploadRoute = express.Router();

uploadRoute.post("/", requireAuth, upload.single("file"), uploadFile);

export default uploadRoute;
