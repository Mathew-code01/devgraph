// server/src/routes/developer.routes.ts

/**
 * DevGraph — Developer Routes
 */

import { Router } from "express";

import {
  getDeveloper,
  listDevelopers,
} from "../controllers/developer.controller.js";

const router = Router();

router.get("/", listDevelopers);
router.get("/:id", getDeveloper);

export default router;