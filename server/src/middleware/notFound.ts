// server/src/middleware/notFound.ts

/**
 * DevGraph — 404 Middleware
 */

import {
  Request,
  Response,
} from "express";

export function notFound(
  req: Request,
  res: Response,
) {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
}