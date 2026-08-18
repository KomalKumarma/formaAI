import { Router } from "express";
import { vehicleInsuranceClaim } from "../data/vehicleInsuranceClaim.js";

export const formRouter = Router();

formRouter.get("/vehicle-insurance-claim", (_request, response) => {
  response.json({ data: vehicleInsuranceClaim });
});
