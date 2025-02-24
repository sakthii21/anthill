
const Bus = require("../models/bus");


const Route = require("../models/route");
const { get } = require("../Routes/userRoutes");

//  Create Bus with an optional route
const createBus = async (req, res) => {
  try {
    const { name, number, capacity, routeId } = req.body;

    if (!name || !number || !capacity) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Check if route exists (optional)
    let assignedRoute = null;
    if (routeId) {
      assignedRoute = await Route.findById(routeId);
      if (!assignedRoute) {
        return res.status(404).json({ error: "Route not found" });
      }
    }

    const newBus = new Bus({
      name,
      number,
      capacity,
      route: assignedRoute ? assignedRoute._id : null, // Assign route if exists
    });

    await newBus.save();
    res.status(201).json({ message: "Bus created successfully", bus: newBus });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getBuses = async (req, res) => {
    try {
      const buses = await Bus.find().populate("route"); // Fetch buses with route details
      res.json(buses);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  const getBusById = async (req, res) => {
    try {
        const { busId } = req.params;
        const bus = await Bus.findById(busId).populate("route"); // Populate route details

        if (!bus) {
            return res.status(404).json({ message: "Bus not found" });
        }

        res.status(200).json(bus);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

  
  const updateBus = async (req, res) => {
    try {
      const { id } = req.params;
      const { route } = req.body;
  
      // Check if the bus exists
      let bus = await Bus.findById(id);
      if (!bus) {
        return res.status(404).json({ error: "Bus not found" });
      }
  
      // If updating route, verify if it exists
      if (route) {
        const routeExists = await Route.findById(route);
        if (!routeExists) {
          return res.status(404).json({ error: "Route not found" });
        }
      }
  
      // Update the bus
      const updatedBus = await Bus.findByIdAndUpdate(id, req.body, { new: true });
      res.status(200).json({ message: "Bus updated successfully", bus: updatedBus });
  
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  // Delete Bus (Only Admins)
  const deleteBus = async (req, res) => {
    try {
      const { id } = req.params;
  
      // Check if the bus exists before deleting
      let bus = await Bus.findById(id);
      if (!bus) {
        return res.status(404).json({ error: "Bus not found" });
      }
  
      await Bus.findByIdAndDelete(id);
      res.status(200).json({ message: "Bus deleted successfully" });
  
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  

module.exports = { createBus,getBuses,updateBus,deleteBus,getBusById};
