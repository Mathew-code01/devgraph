// server/src/controllers/project.controller.ts

/**
 * DevGraph — Project Controller
 *
 * Responsibility:
 * - Handle project-related HTTP requests.
 * - Validate route/query parameters.
 * - Delegate business logic to project.service.ts.
 */

import {
  Request,
  Response,
  NextFunction,
} from "express";

import {
  getProjectById,
  getProjects,
} from "../services/project.service.js";

/**
 * GET /api/projects
 */
export async function listProjects(
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

    const result =
      await getProjects(
        Number.isFinite(page)
          ? page
          : 1,
        Number.isFinite(limit)
          ? limit
          : 20,
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
 * GET /api/projects/:id
 */
export async function getProject(
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
          "A valid project ID is required",
      });

      return;
    }

    const project =
      await getProjectById(id);

    if (!project) {
      res.status(404).json({
        success: false,
        message:
          "Project not found",
      });

      return;
    }

    res.json({
      success: true,
      data: project,
    });
  } catch (error) {
    next(error);
  }
}