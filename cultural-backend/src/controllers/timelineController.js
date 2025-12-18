import TimelineEvent from "../models/TimelineEvent.js";

export const createEvent = async (req, res) => {
  try {
    const event = await TimelineEvent.create(req.body);
    res.status(201).json(event);
  } catch (err) {
    res.status(500).json({ message: "Error in creating Event", error: err });
  }
};

export const getEvents = async (req, res) => {
  try {
    const events = await TimelineEvent.find().sort({ createdAt: -1 });
    res.status(201).json(events);
  } catch (err) {
    res.status(500).json({ message: "Error in fetching events" });
  }
};

export const getEventById = async (req, res) => {
  try {
    const event = await TimelineEvent.findById(req.params.id);
    if (!event) return res.status(401).json({ message: "Not found" });
    res.status(201).json(event);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error in fetching event by id", error: err });
  }
};

export const updateEvent = async (req, res) => {
  try {
    const updatedEvent = await TimelineEvent.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updateEvent) return res.status(401).json({ message: "Not found" });
    res.status(201).json(updatedEvent);
  } catch (err) {
    res.statusn(500).json({ message: "error in updating event" });
  }
};

export const deleteEvent = async (req, res) => {
  try {
    const deleted = await TimelineEvent.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(401).json({ message: "Not found" });
    res.status(201).json({ message: "Event deleted" });
  } catch (err) {
    res.statusn(500).json({ message: "error in Deleting event" });
  }
};
