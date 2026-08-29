import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";

export const aiRouter = Router();
aiRouter.post("/extract", requireAuth, (request, response) => {
  const { text, fields = [] } = request.body;
  if (!text) return response.status(400).json({ error: "A description is required." });
  const values = {};
  for (const field of fields) if (field.name) values[field.name] = null;
  const match = text.match(/(?:my|a) ([A-Z][\w-]*(?:\s+\w+)?)/);
  if (values.vehicle && match) values.vehicle = match[1];
  response.json({ data: { values, provider: "demo", requiresReview: true } });
});
