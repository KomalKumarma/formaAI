import { Router } from "express";
import { vehicleInsuranceClaim } from "../data/vehicleInsuranceClaim.js";
import { Form } from "../models/Form.js";

export const formRouter = Router();

formRouter.get("/vehicle-insurance-claim", async (_request, response, next) => {
  try {
    const form = await Form.findOne({ formId: "vehicle-insurance-claim", status: "published" }).sort({ version: -1 }).lean();
    response.json({ data: form ?? vehicleInsuranceClaim });
  } catch (error) {
    next(error);
  }
});
