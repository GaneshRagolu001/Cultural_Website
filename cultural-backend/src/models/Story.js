import mongoose from "mongoose";

const StorySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      default: "",
    },
    audioUrl: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: ["PENDING", "APPROVED", "REJECTED"],
      default: "PENDING",
    },
  },
  { timestamps: true }
);

const Story = mongoose.model("Story", StorySchema);

export default Story;
