import authMiddleware from "../../core/middlewares/auth.middleware.ts";
import controller from "./repositories.controller.ts";
import { Router } from "express";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Repositories
 *   description: Repository management
 */

/**
 * @swagger
 * /repositories:
 *   post:
 *     summary: Create repository
 *     tags: [Repositories]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: flowsync-api
 *     responses:
 *       201:
 *         description: Repository created successfully
 */
router.post("/", authMiddleware, controller.create);

/**
 * @swagger
 * /repositories:
 *   get:
 *     summary: Get all repositories
 *     tags: [Repositories]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Repositories retrieved successfully
 */
router.get("/", authMiddleware, controller.findAll);

/**
 * @swagger
 * /repositories/{id}:
 *   get:
 *     summary: Get repository by id
 *     tags: [Repositories]
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
 *         description: Repository retrieved successfully
 */
router.get("/:id", authMiddleware, controller.findById);

/**
 * @swagger
 * /repositories/{id}:
 *   put:
 *     summary: Update repository
 *     tags: [Repositories]
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
 *         description: Repository updated successfully
 */
router.put("/:id", authMiddleware, controller.update);

/**
 * @swagger
 * /repositories/{id}:
 *   delete:
 *     summary: Delete repository
 *     tags: [Repositories]
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
 *         description: Repository deleted successfully
 */
router.delete("/:id", authMiddleware, controller.delete);

export default router;
