import authMiddleware from "../../core/middlewares/auth.middleware.ts";
import controller from "./commits.controller.ts";
import { Router } from "express";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Commits
 *   description: Commit management
 */

/**
 * @swagger
 * /commits:
 *   post:
 *     summary: Create commit
 *     tags: [Commits]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Commit created successfully
 */
router.post("/", authMiddleware, controller.create);

/**
 * @swagger
 * /commits:
 *   get:
 *     summary: Get all commits
 *     tags: [Commits]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Commits retrieved successfully
 */
router.get("/", authMiddleware, controller.findAll);

/**
 * @swagger
 * /commits/{id}:
 *   get:
 *     summary: Get commit by id
 *     tags: [Commits]
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
 *         description: Commit retrieved successfully
 */
router.get("/:id", authMiddleware, controller.findById);

/**
 * @swagger
 * /commits/{id}:
 *   put:
 *     summary: Update commit
 *     tags: [Commits]
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
 *         description: Commit updated successfully
 */
router.put("/:id", authMiddleware, controller.update);

/**
 * @swagger
 * /commits/{id}:
 *   delete:
 *     summary: Delete commit
 *     tags: [Commits]
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
 *         description: Commit deleted successfully
 */
router.delete("/:id", authMiddleware, controller.delete);

export default router;
