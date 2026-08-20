// server/src/config/env.ts

/**
 * DevGraph — Environment Configuration
 *
 * Responsibility:
 * - Load environment variables.
 * - Validate required configuration.
 * - Expose strongly typed configuration to the application.
 *
 * IMPORTANT:
 * CognoDB credentials must only exist on the server.
 */

import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),

  PORT: z.coerce.number().int().min(1).max(65535).default(5000),

  COGNODB_URI: z.string().min(1, "COGNODB_URI is required"),

  COGNODB_USERNAME: z
    .string()
    .min(1, "COGNODB_USERNAME is required")
    .default("cognodb"),

  COGNODB_PASSWORD: z.string().min(1, "COGNODB_PASSWORD is required"),

  COGNODB_DATABASE: z.string().optional(),

  CLIENT_URL: z.string().url().default("http://localhost:5173"),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error("Invalid environment configuration:");

  for (const issue of parsed.error.issues) {
    console.error(`- ${issue.path.join(".")}: ${issue.message}`);
  }

  process.exit(1);
}

export const env = parsed.data;

export const isProduction = env.NODE_ENV === "production";
export const isDevelopment = env.NODE_ENV === "development";