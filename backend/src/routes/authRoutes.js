import { randomBytes, scryptSync, timingSafeEqual } from "node:crypto";
import { Router } from "express";
import { requireAuth, requireRole, signToken } from "../middleware/auth.js";
import { User } from "../models/User.js";

const hash = (password, salt = randomBytes(16).toString("hex")) => `${salt}:${scryptSync(password, salt, 64).toString("hex")}`;
const matches = (password, saved) => { const [salt, value] = saved.split(":"); return timingSafeEqual(Buffer.from(value, "hex"), Buffer.from(hash(password, salt).split(":")[1], "hex")); };
const tokenFor = (user) => signToken({ sub: user.id, role: user.role, email: user.email });

export const authRouter = Router();
authRouter.post("/register", async (request, response, next) => { try { const { name, email, password } = request.body; if (!name || !email || !password || password.length < 8) return response.status(400).json({ error: "Name, email, and an 8-character password are required." }); const user = await User.create({ name, email, passwordHash: hash(password) }); response.status(201).json({ data: { token: tokenFor(user), user: { id: user.id, name: user.name, email: user.email, role: user.role } } }); } catch (error) { next(error); } });
authRouter.post("/login", async (request, response, next) => { try { const user = await User.findOne({ email: request.body.email?.toLowerCase() }); if (!user || !matches(request.body.password ?? "", user.passwordHash)) return response.status(401).json({ error: "Invalid email or password." }); response.json({ data: { token: tokenFor(user) } }); } catch (error) { next(error); } });
authRouter.get("/me", requireAuth, (request, response) => response.json({ data: request.user }));
authRouter.get("/users", requireAuth, requireRole("ADMIN"), async (_request, response, next) => { try { const users = await User.find().select("name email role createdAt").lean(); response.json({ data: users }); } catch (error) { next(error); } });
