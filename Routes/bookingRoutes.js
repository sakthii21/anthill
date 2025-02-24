const express = require("express");
const { searchBuses, bookSeat, cancelBooking } = require("../controllers/bookingcontroller");
const { auth } = require("../middleware/auth");

const router = express.Router();


router.get("/buses/search", searchBuses);
router.post("/buses/:busId", auth, bookSeat);
router.delete("/bookings/:bookingId", auth, cancelBooking);

module.exports = router;
