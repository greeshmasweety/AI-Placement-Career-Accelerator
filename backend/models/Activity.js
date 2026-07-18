import mongoose from "mongoose";

const activitySchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    type: {
      type: String,
      enum: ["resume", "interview", "roadmap", "human", "profile"],
      required: true,
    },
    label: { type: String, required: true }, // "Resume Analyzed"
    sub: { type: String, default: "" }, // "ATS score improved"
  },
  { timestamps: true }
);

export default mongoose.model("Activity", activitySchema);
