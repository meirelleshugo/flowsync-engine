import authMiddleware from "../../core/middlewares/auth.middleware.ts";
import { usersController } from "./users.controller.ts";
import { Router } from "express";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Users endpoints
 */

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create user
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created
 */
router.post("/", usersController.create);

/**
 * @swagger
 * /users:
 *   get:
 *     summary: List users
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: Users list
 */
router.get("/", authMiddleware, usersController.findAll);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Find user by ID
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: User found successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 */
router.get("/:id", authMiddleware, usersController.findById);

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update user
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: admin@flowsync.com
 *               password:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       200:
 *         description: User updated successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 */
router.put("/:id", authMiddleware, usersController.update);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete user
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 */
router.delete("/:id", authMiddleware, usersController.delete);

export default router;
