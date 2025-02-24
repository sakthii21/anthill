const Route = require("../models/route");
const Bus = require("../models/bus");

//  Add Route & Assign to a Bus
const addRouteToBus = async (req, res) => {
  try {
    const { busId } = req.params;  // Get bus ID from URL
    const { startLocation, endLocation, stops, distance, duration } = req.body;

    const bus = await Bus.findById(busId);
    if (!bus) return res.status(404).json({ error: "Bus not found" });

    const newRoute = new Route({ startLocation, endLocation, stops, distance, duration });
    await newRoute.save();

    bus.route = newRoute._id;  // Link the route to the bus
    await bus.save();

    res.status(201).json({ message: "Route added and assigned to bus", bus, route: newRoute });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//  Update Route of a Specific Bus
const updateBusRoute = async (req, res) => {
  try {
    const { busId } = req.params;
    const bus = await Bus.findById(busId).populate("route");

    if (!bus || !bus.route) return res.status(404).json({ error: "Bus or route not found" });

    const updatedRoute = await Route.findByIdAndUpdate(bus.route._id, req.body, { new: true });

    res.json({ message: "Bus route updated successfully", route: updatedRoute });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//  Get Route for a Specific Bus
const getBusRoute = async (req, res) => {
  try {
    const { busId } = req.params;
    const bus = await Bus.findById(busId).populate("route");

    if (!bus || !bus.route) return res.status(404).json({ error: "Route not found for this bus" });

    res.json(bus.route);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { addRouteToBus, updateBusRoute, getBusRoute };
