import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import { Application } from "../models/Application.js";

export const applicationRouter = Router();
applicationRouter.use(requireAuth);
applicationRouter.post("/", async (request, response, next) => { try { const { formId, formVersion, formData = {} } = request.body; if (!formId || !formVersion) return response.status(400).json({ error: "formId and formVersion are required." }); const application = await Application.create({ user: request.user.sub, formId, formVersion, formData }); response.status(201).json({ data: application }); } catch (error) { next(error); } });
applicationRouter.get("/", async (request, response, next) => { try { const applications = await Application.find({ user: request.user.sub }).sort({ updatedAt: -1 }); response.json({ data: applications }); } catch (error) { next(error); } });
applicationRouter.get("/:id", async (request, response, next) => { try { const application = await Application.findOne({ _id: request.params.id, user: request.user.sub }); if (!application) return response.status(404).json({ error: "Application not found." }); response.json({ data: application }); } catch (error) { next(error); } });
applicationRouter.put("/:id", async (request, response, next) => { try { const application = await Application.findOneAndUpdate({ _id: request.params.id, user: request.user.sub, status: { $in: ["DRAFT", "IN_PROGRESS"] } }, { $set: { formData: request.body.formData, status: "IN_PROGRESS" } }, { new: true }); if (!application) return response.status(404).json({ error: "Editable application not found." }); response.json({ data: application }); } catch (error) { next(error); } });
applicationRouter.delete("/:id", async (request, response, next) => { try { const application = await Application.findOneAndDelete({ _id: request.params.id, user: request.user.sub, status: "DRAFT" }); if (!application) return response.status(404).json({ error: "Draft not found." }); response.status(204).end(); } catch (error) { next(error); } });
