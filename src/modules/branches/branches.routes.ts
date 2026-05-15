import authMiddleware from "../../core/middlewares/auth.middleware.ts";
import controller from "./branches.controller.ts";
import { Router } from "express";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Branches
 *   description: Branch management
 */

/**
 * @swagger
 * /branches:
 *   post:
 *     summary: Create branch
 *     tags: [Branches]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Branch created successfully
 */
router.post("/", authMiddleware, controller.create);

/**
 * @swagger
 * /branches:
 *   get:
 *     summary: Get all branches
 *     tags: [Branches]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Branches retrieved successfully
 */
router.get("/", authMiddleware, controller.findAll);

/**
 * @swagger
 * /branches/{id}:
 *   get:
 *     summary: Get branch by id
 *     tags: [Branches]
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
 *         description: Branch retrieved successfully
 */
router.get("/:id", authMiddleware, controller.findById);

/**
 * @swagger
 * /branches/{id}:
 *   put:
 *     summary: Update branch
 *     tags: [Branches]
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
 *         description: Branch updated successfully
 */
router.put("/:id", authMiddleware, controller.update);

/**
 * @swagger
 * /branches/{id}:
 *   delete:
 *     summary: Delete branch
 *     tags: [Branches]
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
 *         description: Branch deleted successfully
 */
router.delete("/:id", authMiddleware, controller.delete);

export default router;
