import { createHmac, timingSafeEqual } from "node:crypto";

const secret = () => process.env.JWT_SECRET ?? "development-secret-change-me";
const encode = (value) => Buffer.from(JSON.stringify(value)).toString("base64url");

export function signToken(payload) {
  const body = `${encode({ alg: "HS256", typ: "JWT" })}.${encode(payload)}`;
  return `${body}.${createHmac("sha256", secret()).update(body).digest("base64url")}`;
}

export function requireAuth(request, response, next) {
  const token = request.headers.authorization?.replace("Bearer ", "");
  if (!token) return response.status(401).json({ error: "Authentication required." });
  const [header, payload, signature] = token.split(".");
  const expected = createHmac("sha256", secret()).update(`${header}.${payload}`).digest("base64url");
  if (!signature || !timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) return response.status(401).json({ error: "Invalid token." });
  request.user = JSON.parse(Buffer.from(payload, "base64url").toString());
  next();
}
