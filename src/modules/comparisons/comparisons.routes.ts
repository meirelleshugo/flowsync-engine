import { Router } from "express";

import controller from "./comparisons.controller.ts";

import authMiddleware from "../../core/middlewares/auth.middleware.ts";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Comparisons
 *   description: Branch comparison management
 */

/**
 * @swagger
 * /comparisons:
 *   post:
 *     summary: Compare branches
 *     tags: [Comparisons]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - repositoryId
 *               - sourceBranchId
 *               - targetBranchId
 *             properties:
 *               repositoryId:
 *                 type: string
 *                 example: 665ab12f9f1b1f4c2d111111
 *               sourceBranchId:
 *                 type: string
 *                 example: 665ab12f9f1b1f4c2d222222
 *               targetBranchId:
 *                 type: string
 *                 example: 665ab12f9f1b1f4c2d333333
 *     responses:
 *       201:
 *         description: Comparison completed successfully
 */
router.post("/", authMiddleware, controller.compare);

/**
 * @swagger
 * /comparisons:
 *   get:
 *     summary: Get all comparisons
 *     tags: [Comparisons]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Comparisons retrieved successfully
 */
router.get("/", authMiddleware, controller.findAll);

/**
 * @swagger
 * /comparisons/{id}:
 *   get:
 *     summary: Get comparison by id
 *     tags: [Comparisons]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Comparison retrieved successfully
 */
router.get("/:id", authMiddleware, controller.findById);

export default router;
