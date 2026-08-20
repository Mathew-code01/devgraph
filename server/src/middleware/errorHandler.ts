// server/src/middleware/errorHandler.ts

/**
 * DevGraph — Global Error Handler
 *
 * Responsibility:
 * - Prevent unhandled API failures.
 * - Return consistent JSON errors.
 * - Avoid leaking sensitive database information in production.
 */

import {
  ErrorRequestHandler,
} from "express";

import { isProduction } from "../config/env.js";

export const errorHandler: ErrorRequestHandler = (
  error,
  _req,
  res,
  _next,
) => {
  console.error("API error:", error);

  const message =
    !isProduction && error instanceof Error
      ? error.message
      : "An unexpected server error occurred.";

  res.status(500).json({
    success: false,
    message,
  });
};