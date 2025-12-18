import mongoose from "mongoose";
import Heritage from "./Heritage.js";

const TimelineEventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    yearRange: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
      default: "",
    },
    relatedItems: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: Heritage,
      },
    ],
  },
  { timestamps: true }
);

const TimelineEvent = mongoose.model("TimelineEvent", TimelineEventSchema);

export default TimelineEvent;
