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
  exploreProjectGraph,
  findDevelopersByTechnology,
  findRelatedTechnologies,
  getGraphOverview,
} from "../services/graph.service.js";

/**
 * Clamp graph depth.
 */
function getDepth(
  value: unknown,
): number {
  const depth = Number(value);

  if (!Number.isFinite(depth)) {
    return 2;
  }

  return Math.min(
    Math.max(Math.floor(depth), 1),
    5,
  );
}

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
          "A valid developer ID is required.",
      });

      return;
    }

    const depth =
      getDepth(req.query.depth);

    const result =
      await exploreDeveloperGraph(
        developerId,
        depth,
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
 * GET /api/graph/projects/:projectId
 *
 * Explore the graph around a project.
 */
export async function exploreProject(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const projectId =
      req.params.projectId;

    if (
      typeof projectId !== "string" ||
      projectId.trim().length === 0
    ) {
      res.status(400).json({
        success: false,
        message:
          "A valid project ID is required.",
      });

      return;
    }

    const depth =
      getDepth(req.query.depth);

    const result =
      await exploreProjectGraph(
        projectId,
        depth,
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
 * GET /api/graph/technology/:technologyId/developers
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
          "A valid technology ID is required.",
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
 * GET /api/graph/technology/:technologyId/related
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
          "A valid technology ID is required.",
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