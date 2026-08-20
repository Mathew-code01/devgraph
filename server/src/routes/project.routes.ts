// server/src/routes/project.routes.ts

/**
 * DevGraph — Project Routes
 */

import { Router } from "express";

import {
  getProject,
  listProjects,
} from "../controllers/project.controller.js";

const router = Router();

router.get("/", listProjects);
router.get("/:id", getProject);

export default router;