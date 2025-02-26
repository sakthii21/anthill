const express = require("express");
const { searchBuses, bookSeat, cancelBooking } = require("../controllers/bookingcontroller");
const { auth } = require("../middleware/auth");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Bookings
 *   description: Bus booking management
 */

/**
 * @swagger
 * /book/buses/search:
 *   get:
 *     summary: Search for available buses
 *     tags: [Bookings]
 *     parameters:
 *       - in: query
 *         name: from
 *         schema:
 *           type: string
 *         required: true
 *         example: New York
 *       - in: query
 *         name: to
 *         schema:
 *           type: string
 *         required: true
 *         example: Boston
 *       - in: query
 *         name: date
 *         schema:
 *           type: string
 *           format: date
 *         required: true
 *         example: 2024-07-01
 *     responses:
 *       200:
 *         description: List of available buses
 *       400:
 *         description: Bad request (missing or invalid parameters)
 */
router.get("/buses/search", searchBuses);

/**
 * @swagger
 * /book/buses/{busId}:
 *   post:
 *     summary: Book a seat on a bus
 *     tags: [Bookings]
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
 *               userId:
 *                 type: string
 *                 example: abcd5678
 *               seatNumber:
 *                 type: integer
 *                 example: 12
 *     responses:
 *       201:
 *         description: Seat booked successfully
 *       401:
 *         description: Unauthorized (login required)
 *       404:
 *         description: Bus not found
 */
router.post("/buses/:busId", auth, bookSeat);

/**
 * @swagger
 * /book/bookings/{bookingId}:
 *   delete:
 *     summary: Cancel a bus booking
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: bookingId
 *         required: true
 *         schema:
 *           type: string
 *         example: 5678efgh
 *     responses:
 *       200:
 *         description: Booking canceled successfully
 *       401:
 *         description: Unauthorized (login required)
 *       404:
 *         description: Booking not found
 */
router.delete("/bookings/:bookingId", auth, cancelBooking);

module.exports = router;
