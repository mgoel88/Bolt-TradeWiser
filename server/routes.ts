import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import leadsRouter from "./routes/leads";
import authRouter from "./routes/auth";
import passwordResetRouter from "./routes/password-reset";
import googleSSORouter from "./routes/google-sso";
import phoneOTPRouter from "./routes/phone-otp";

export async function registerRoutes(app: Express): Promise<Server> {
  // put application routes here
  // prefix all routes with /api

  // use storage to perform CRUD operations on the storage interface
  // e.g. storage.insertUser(user) or storage.getUserByUsername(username)

  // Authentication routes
  app.use("/api/auth", authRouter);
  app.use("/api/password-reset", passwordResetRouter);
  app.use("/api/google-sso", googleSSORouter);
  app.use("/api/phone-otp", phoneOTPRouter);
  
  // Lead management routes
  app.use("/api", leadsRouter);

  const httpServer = createServer(app);

  return httpServer;
}
