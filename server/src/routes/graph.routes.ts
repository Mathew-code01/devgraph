// server/src/routes/graph.routes.ts

/**
 * DevGraph — Graph Routes
 */

import {
  Router,
} from "express";

import {
  developersByTechnology,
  exploreDeveloper,
  exploreProject,
  graphOverview,
  relatedTechnologies,
} from "../controllers/graph.controller.js";

const router =
  Router();

/**
 * GET /api/graph
 */
router.get(
  "/",
  graphOverview,
);

/**
 * GET /api/graph/overview
 */
router.get(
  "/overview",
  graphOverview,
);

/**
 * GET /api/graph/developers/:id
 */
router.get(
  "/developers/:id",
  exploreDeveloper,
);

/**
 * GET /api/graph/projects/:projectId
 *
 * Project graph explorer.
 */
router.get(
  "/projects/:projectId",
  exploreProject,
);

/**
 * GET /api/graph/technology/:technologyId/developers
 */
router.get(
  "/technology/:technologyId/developers",
  developersByTechnology,
);

/**
 * GET /api/graph/technology/:technologyId/related
 */
router.get(
  "/technology/:technologyId/related",
  relatedTechnologies,
);

export default router;