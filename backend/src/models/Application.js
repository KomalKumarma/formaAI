import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
  formId: { type: String, required: true },
  formVersion: { type: Number, required: true },
  status: { type: String, enum: ["DRAFT", "IN_PROGRESS", "SUBMITTED", "UNDER_REVIEW"], default: "DRAFT" },
  formData: { type: mongoose.Schema.Types.Mixed, default: {} }
}, { timestamps: true });

export const Application = mongoose.model("Application", applicationSchema);
