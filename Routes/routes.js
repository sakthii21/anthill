const express = require("express");
const { addRouteToBus, updateBusRoute, getBusRoute } = require("../controllers/routeController");
const { auth, adminMiddleware } = require("../middleware/auth");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Routes
 *   description: Bus route management
 */

/**
 * @swagger
 * /routes/{busId}/routes:
 *   post:
 *     summary: Add a route to a bus
 *     tags: [Routes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: busId
 *         required: true
 *         schema:
 *           type: string
 *         example: 1234abcd
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               startLocation:
 *                 type: string
 *                 example: New York
 *               endLocation:
 *                 type: string
 *                 example: Boston
 *               stops:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["Philadelphia", "Hartford"]
 *     responses:
 *       201:
 *         description: Route added successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (Admin access required)
 */
router.post("/:busId/routes", auth, adminMiddleware, addRouteToBus);

/**
 * @swagger
 * /routes/{busId}/routes:
 *   put:
 *     summary: Update a bus route
 *     tags: [Routes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: busId
 *         required: true
 *         schema:
 *           type: string
 *         example: 1234abcd
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               startLocation:
 *                 type: string
 *                 example: New York
 *               endLocation:
 *                 type: string
 *                 example: Boston
 *               stops:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["Philadelphia", "Hartford"]
 *     responses:
 *       200:
 *         description: Route updated successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (Admin access required)
 *       404:
 *         description: Route not found
 */
router.put("/:busId/routes", auth, adminMiddleware, updateBusRoute);

/**
 * @swagger
 * /routes/{busId}/routes:
 *   get:
 *     summary: Get bus routes
 *     tags: [Routes]
 *     parameters:
 *       - in: path
 *         name: busId
 *         required: true
 *         schema:
 *           type: string
 *         example: 1234abcd
 *     responses:
 *       200:
 *         description: List of routes retrieved successfully
 *       404:
 *         description: No routes found for this bus
 */
router.get("/:busId/routes", getBusRoute);

module.exports = router;
