import cors from "cors";
import express from "express";
import { config } from "./config/env.js";
import { authRouter } from "./routes/authRoutes.js";
import { formRouter } from "./routes/formRoutes.js";

export const app = express();

app.use(cors({ origin: config.clientOrigin }));
app.use(express.json());
app.get("/health", (_request, response) => response.json({ status: "ok" }));
app.use("/api/auth", authRouter);
app.use("/api/forms", formRouter);
