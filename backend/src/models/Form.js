import mongoose from "mongoose";

const optionSchema = new mongoose.Schema({ label: { type: String, required: true }, value: { type: String, required: true } }, { _id: false });
const showIfSchema = new mongoose.Schema({ field: String, operator: { type: String, enum: ["equals", "contains"], required: true }, value: mongoose.Schema.Types.Mixed }, { _id: false });
const fieldSchema = new mongoose.Schema({ id: String, name: String, type: { type: String, required: true }, label: { type: String, required: true }, required: Boolean, placeholder: String, options: [optionSchema], validation: { minLength: Number }, showIf: showIfSchema }, { _id: false });

const formSchema = new mongoose.Schema({
  formId: { type: String, required: true, trim: true },
  name: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  version: { type: Number, required: true, min: 1 },
  status: { type: String, enum: ["draft", "published", "archived"], default: "draft" },
  fields: { type: [fieldSchema], default: [] }
}, { timestamps: true });

formSchema.index({ formId: 1, version: 1 }, { unique: true });
formSchema.index({ formId: 1, status: 1, version: -1 });

export const Form = mongoose.model("Form", formSchema);
