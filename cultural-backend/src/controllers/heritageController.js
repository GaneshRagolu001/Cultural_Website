import { json } from "express";
import Heritage from "../models/Heritage.js";

export const createHeritage = async (req, res) => {
  try {
    const heritage = await Heritage.create(req.body);
    res.status(201).json(heritage);
  } catch (err) {
    res.status(500).json({ message: "Error creating heritage" });
  }
};

export const getHeritage = async (req, res) => {
  try {
    const items = await Heritage.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: "Error fetching heritage" });
  }
};

export const getHeritageById = async (req, res) => {
  try {
    const item = await Heritage.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Not found" });
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: "Error fetching item" });
  }
};

export const updateHeritage = async (req, res) => {
  try {
    const updated = await Heritage.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated) return res.status(404).json({ message: "Not found" });

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Error Updating item" });
  }
};

export const deleteHeritage = async (req, res) => {
  try {
    const deleted = await Heritage.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Deleted Successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting item" });
  }
};
