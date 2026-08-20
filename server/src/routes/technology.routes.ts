// server/src/routes/technology.routes.ts

/**
 * DevGraph — Technology Routes
 */

import { Router } from "express";

import {
  getTechnology,
  listTechnologies,
} from "../controllers/technology.controller.js";

const router = Router();

router.get("/", listTechnologies);
router.get("/:id", getTechnology);

export default router;