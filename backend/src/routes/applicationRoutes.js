import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import { Application } from "../models/Application.js";

export const applicationRouter = Router();
applicationRouter.use(requireAuth);
applicationRouter.post("/", async (request, response, next) => { try { const { formId, formVersion, formData = {} } = request.body; if (!formId || !formVersion) return response.status(400).json({ error: "formId and formVersion are required." }); const application = await Application.create({ user: request.user.sub, formId, formVersion, formData }); response.status(201).json({ data: application }); } catch (error) { next(error); } });
applicationRouter.get("/", async (request, response, next) => { try { const applications = await Application.find({ user: request.user.sub }).sort({ updatedAt: -1 }); response.json({ data: applications }); } catch (error) { next(error); } });
