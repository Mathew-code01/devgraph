// server/src/controllers/developer.controller.ts

/**
 * DevGraph — Developer Controller
 *
 * Responsibility:
 * - Handle HTTP requests.
 * - Validate request parameters.
 * - Delegate business logic to developer.service.ts.
 */

import {
  Request,
  Response,
  NextFunction,
} from "express";

import {
  getDeveloperById,
  getDevelopers,
} from "../services/developer.service.js";

/**
 * GET /api/developers
 */
export async function listDevelopers(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const page = Number(
      req.query.page ?? 1,
    );

    const limit = Number(
      req.query.limit ?? 20,
    );

    const search =
      typeof req.query.search === "string"
        ? req.query.search
        : undefined;

    const result =
      await getDevelopers(
        Number.isFinite(page)
          ? page
          : 1,
        Number.isFinite(limit)
          ? limit
          : 20,
        search,
      );

    res.json({
      success: true,
      ...result,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * GET /api/developers/:id
 */
export async function getDeveloper(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const id = req.params.id;

    if (
      typeof id !== "string" ||
      id.trim().length === 0
    ) {
      res.status(400).json({
        success: false,
        message:
          "A valid developer ID is required",
      });

      return;
    }

    const developer =
      await getDeveloperById(id);

    if (!developer) {
      res.status(404).json({
        success: false,
        message:
          "Developer not found",
      });

      return;
    }

    res.json({
      success: true,
      data: developer,
    });
  } catch (error) {
    next(error);
  }
}