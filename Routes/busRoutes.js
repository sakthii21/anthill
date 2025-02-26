const express = require('express');
const { createBus, getBuses, updateBus, deleteBus, getBusById } = require("../controllers/busController");
const { auth, adminMiddleware } = require("../middleware/auth");

const Router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Buses
 *   description: Bus management endpoints
 */

/**
 * @swagger
 * /bus/:
 *   post:
 *     summary: Add a new bus
 *     tags: [Buses]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Volvo Express
 *               number:
 *                 type: string
 *                 example: AB-1234
 *               seats:
 *                 type: integer
 *                 example: 50
 *     responses:
 *       201:
 *         description: Bus added successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (Admin access required)
 */
Router.post("/", auth, adminMiddleware, createBus);

/**
 * @swagger
 * /bus/:
 *   get:
 *     summary: Get all buses
 *     tags: [Buses]
 *     responses:
 *       200:
 *         description: List of all buses
 */
Router.get("/", getBuses);

/**
 * @swagger
 * /bus/get/{busId}:
 *   get:
 *     summary: Get a bus by ID
 *     tags: [Buses]
 *     parameters:
 *       - in: path
 *         name: busId
 *         required: true
 *         schema:
 *           type: string
 *         example: 1234abcd
 *     responses:
 *       200:
 *         description: Bus details retrieved successfully
 *       404:
 *         description: Bus not found
 */
Router.get("/get/:busId", getBusById);

/**
 * @swagger
 * /bus/{busId}:
 *   put:
 *     summary: Update bus details
 *     tags: [Buses]
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
 *               name:
 *                 type: string
 *                 example: Volvo Super Deluxe
 *               seats:
 *                 type: integer
 *                 example: 45
 *     responses:
 *       200:
 *         description: Bus updated successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (Admin access required)
 *       404:
 *         description: Bus not found
 */
Router.put("/:busId", auth, adminMiddleware, updateBus);

/**
 * @swagger
 * /bus/{busId}:
 *   delete:
 *     summary: Delete a bus
 *     tags: [Buses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: busId
 *         required: true
 *         schema:
 *           type: string
 *         example: 1234abcd
 *     responses:
 *       200:
 *         description: Bus deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (Admin access required)
 *       404:
 *         description: Bus not found
 */
Router.delete("/:busId", auth, adminMiddleware, deleteBus);

module.exports = Router;
