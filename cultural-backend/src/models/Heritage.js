import mongoose from "mongoose";

const heritageSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ["monument", "festival", "art", "food"],
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    images: {
      type: [String],
      default: [],
    },
    audioUrl: {
      type: String,
      default: "",
    },
    qrCodeUrl: {
      type: String,
      default: "",
    },
    timelineEventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TimelineEvent",
      default: null,
    },
  },
  { timestamps: true }
);

const Heritage = mongoose.model("Heritage", heritageSchema);
export default Heritage;
