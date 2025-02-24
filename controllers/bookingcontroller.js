const Bus = require("../models/bus");

const Booking = require("../models/booking");

// Search Buses

const searchBuses = async (req, res) => {
    try {
        console.log("Full Query Params:", req.query);

        let { startLocation, endLocation } = req.query;

        // Trim spaces to avoid matching issues
        startLocation = startLocation?.trim();
        endLocation = endLocation?.trim();

        console.log("Searching for buses from", startLocation, "to", endLocation);

        // Find buses and populate their associated route details
        const buses = await Bus.find().populate("route");

        // Filter buses based on route start and end location
        const filteredBuses = buses.filter(bus => 
            bus.route && // Ensure the bus has a route
            bus.route.startLocation === startLocation &&
            bus.route.endLocation === endLocation
        );

        if (filteredBuses.length === 0) {
            return res.status(404).json({ message: "No buses found for the given route" });
        }

        res.status(200).json({ buses: filteredBuses });
    } catch (err) {
        console.error("Error:", err.message);
        res.status(500).json({ error: err.message });
    }
};



// Book a Seat
const bookSeat = async (req, res) => {
    try {
        const { busId } = req.params;
        const { userId, date, seatNumber } = req.body;
        
        const bus = await Bus.findById(busId);
        if (!bus) return res.status(404).json({ message: "Bus not found" });
        
        const existingBooking = await Booking.findOne({ busId, seatNumber });
        if (existingBooking) return res.status(400).json({ message: "Seat already booked" });

        const newBooking = await Booking.create({ userId, busId, date, seatNumber });
        
        res.status(201).json({ message: "Booking successful", booking: newBooking });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Cancel Booking
const cancelBooking = async (req, res) => {
    try {
        const { bookingId } = req.params;
        const booking = await Booking.findById(bookingId);
        if (!booking) return res.status(404).json({ message: "Booking not found" });

        booking.status = "cancelled";
        await booking.save();
        
        res.status(200).json({ message: "Booking cancelled successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { searchBuses, bookSeat, cancelBooking };
