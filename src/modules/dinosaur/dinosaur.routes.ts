import { Router } from "express";

import {
  dinosaurController,
} from "./dinosaur.controller.ts";

import authMiddleware from "../../core/middlewares/auth.middleware.ts";

const router = Router();

/**
 * =========================================
 * PUBLIC
 * =========================================
 */

router.get(
  "/",
  dinosaurController.findAll,
);

router.get(
  "/:dinosaurId",
  dinosaurController.findById,
);

/**
 * =========================================
 * PROTECTED
 * =========================================
 */

router.post(
  "/",
  authMiddleware,
  dinosaurController.create,
);

router.patch(
  "/:dinosaurId",
  authMiddleware,
  dinosaurController.update,
);

router.delete(
  "/:dinosaurId",
  authMiddleware,
  dinosaurController.delete,
);

router.post(
  "/transaction/create",
  authMiddleware,
  dinosaurController.createWithTransaction,
);

export default router;