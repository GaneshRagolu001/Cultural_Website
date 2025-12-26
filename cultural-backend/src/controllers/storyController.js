import Story from "../models/Story.js";

export const submitStory = async (req, res) => {
  try {
    const story = await Story.create({
      userId: req.user.id,
      title: req.body.title,
      content: req.body.content,
      state: req.body.state,
      imageUrl: req.body.imageUrl || "",
      audioUrl: req.body.audioUrl || "",
    });
    res
      .status(201)
      .json({ message: "Story submitted, waiting for approval", story });
  } catch (err) {
    res.status(500).json({ message: "Error in submitting story", error: err });
  }
};

export const storyDetail = async (req, res) => {
  try {
    const story = await Story.findById(req.params.id).populate(
      "userId",
      "name email"
    );
    if (!story || story.status !== "APPROVED") {
      return res.status(404).json({ message: "Story not found" });
    }
    res.json(story);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getApprovedStories = async (req, res) => {
  try {
    const stories = await Story.find({ status: "APPROVED" })
      .populate("userId", "name")
      .sort({ createAt: -1 });

    res.status(201).json(stories);
  } catch (err) {
    res.status(500).json({ message: "Error fetching stories" });
  }
};

export const getPendingStories = async (req, res) => {
  console.log("pending stories");
  try {
    const stories = await Story.find({ status: "PENDING" })
      .populate("userId", "name email")
      .sort({ createdAt: -1 });
    res.status(201).json(stories);
  } catch (err) {
    res.status(500).json({ message: "Erro fetching pending stories" });
  }
};

export const approveStory = async (req, res) => {
  try {
    const story = await Story.findByIdAndUpdate(
      req.params.id,
      { status: "APPROVED" },
      { new: true }
    );
    if (!story) return res.status(404).json({ message: "Story not found" });

    res.status(201).json({ message: "Story approved", story });
  } catch (err) {
    res.status(500).json({ message: "Error in approving story" });
  }
};

export const rejectStory = async (req, res) => {
  try {
    const story = await Story.findByIdAndUpdate(
      req.params.id,
      { status: "REJECTED" },
      { new: true }
    );
    if (!story) return res.status(404).json({ message: "Story not found" });
    res.status(201).json({ message: "Story rejected", story });
  } catch (err) {
    res.status(500).json({ message: "Error rejecting story" });
  }
};
