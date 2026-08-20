// server/src/controllers/graph.controller.ts


/**
 * DevGraph — Graph Controller
 *
 * Responsibility:
 * - Handle graph-related HTTP requests.
 * - Validate route parameters.
 * - Delegate graph operations to graph.service.ts.
 */

import {
  Request,
  Response,
  NextFunction,
} from "express";

import {
  exploreDeveloperGraph,
  findDevelopersByTechnology,
  findRelatedTechnologies,
  getGraphOverview,
} from "../services/graph.service.js";

/**
 * GET /api/graph/developers/:id
 */
export async function exploreDeveloper(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const developerId =
      req.params.id;

    if (
      typeof developerId !== "string" ||
      developerId.trim().length === 0
    ) {
      res.status(400).json({
        success: false,
        message:
          "A valid developer ID is required",
      });

      return;
    }

    const depth = Number(
      req.query.depth ?? 2,
    );

    const result =
      await exploreDeveloperGraph(
        developerId,
        Number.isFinite(depth)
          ? depth
          : 2,
      );

    res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * GET /api/graph/technologies/:technologyId/developers
 */
export async function developersByTechnology(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const technologyId =
      req.params.technologyId;

    if (
      typeof technologyId !== "string" ||
      technologyId.trim().length === 0
    ) {
      res.status(400).json({
        success: false,
        message:
          "A valid technology ID is required",
      });

      return;
    }

    const developers =
      await findDevelopersByTechnology(
        technologyId,
      );

    res.json({
      success: true,
      data: developers,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * GET /api/graph/technologies/:technologyId/related
 */
export async function relatedTechnologies(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const technologyId =
      req.params.technologyId;

    if (
      typeof technologyId !== "string" ||
      technologyId.trim().length === 0
    ) {
      res.status(400).json({
        success: false,
        message:
          "A valid technology ID is required",
      });

      return;
    }

    const technologies =
      await findRelatedTechnologies(
        technologyId,
      );

    res.json({
      success: true,
      data: technologies,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * GET /api/graph/overview
 */
export async function graphOverview(
  _req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const overview =
      await getGraphOverview();

    res.json({
      success: true,
      data: overview,
    });
  } catch (error) {
    next(error);
  }
}