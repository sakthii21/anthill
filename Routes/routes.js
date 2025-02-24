const express = require("express");
const { addRouteToBus, updateBusRoute, getBusRoute } = require("../controllers/routeController");
const { auth, adminMiddleware } = require("../middleware/auth");

const router = express.Router();

router.post("/:busId/routes", auth, adminMiddleware, addRouteToBus);  // Admin only
router.put("/:busId/routes", auth, adminMiddleware, updateBusRoute);  // Admin only
router.get("/:busId/routes", getBusRoute); // users

module.exports = router;
