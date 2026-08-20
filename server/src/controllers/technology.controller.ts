// server/src/controllers/technology.controller.ts

/**
 * DevGraph — Technology Controller
 *
 * Responsibility:
 * - Handle HTTP requests.
 * - Validate route parameters.
 * - Delegate business logic to technology.service.ts.
 */

import {
  Request,
  Response,
  NextFunction,
} from "express";

import {
  getTechnologies,
  getTechnologyById,
} from "../services/technology.service.js";

export async function listTechnologies(
  _req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const technologies =
      await getTechnologies();

    res.json({
      success: true,
      data: technologies,
    });
  } catch (error) {
    next(error);
  }
}

export async function getTechnology(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const id = req.params.id;

    /**
     * Express route parameters can be typed as
     * string | string[] | undefined.
     *
     * A technology ID must be a single non-empty string.
     */
    if (typeof id !== "string" || !id.trim()) {
      res.status(400).json({
        success: false,
        message: "Technology ID is required",
      });
      return;
    }

    const technology =
      await getTechnologyById(id);

    if (!technology) {
      res.status(404).json({
        success: false,
        message: "Technology not found",
      });
      return;
    }

    res.json({
      success: true,
      data: technology,
    });
  } catch (error) {
    next(error);
  }
}