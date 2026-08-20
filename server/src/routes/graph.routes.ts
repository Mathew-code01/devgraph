// server/src/routes/graph.routes.ts

/**
 * DevGraph — Graph Routes
 */

import { Router } from "express";

import {
  developersByTechnology,
  exploreDeveloper,
  graphOverview,
  relatedTechnologies,
} from "../controllers/graph.controller.js";

const router = Router();

router.get("/overview", graphOverview);

router.get(
  "/developers/:id",
  exploreDeveloper,
);

router.get(
  "/technology/:technologyId/developers",
  developersByTechnology,
);

router.get(
  "/technology/:technologyId/related",
  relatedTechnologies,
);

export default router;