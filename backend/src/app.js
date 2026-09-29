import cors from "cors";
import express from "express";
import { config } from "./config/env.js";
import { authRouter } from "./routes/authRoutes.js";
import { applicationRouter } from "./routes/applicationRoutes.js";
import { aiRouter } from "./routes/aiRoutes.js";
import { formRouter } from "./routes/formRoutes.js";

export const app = express();

app.use(cors());
app.use(express.json());
app.get("/health", (_request, response) => response.json({ status: "ok" }));
app.use("/api/auth", authRouter);
app.use("/api/applications", applicationRouter);
app.use("/api/ai", aiRouter);
app.use("/api/forms", formRouter);
