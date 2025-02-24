const mongoose = require("mongoose");

const routeSchema = new mongoose.Schema({
  startLocation: { type: String, required: true },
  endLocation: { type: String, required: true },
  stops: [{ type: String, required: true }], // List of stops
  distance: { type: Number, required: true }, // Distance in km
  duration: { type: String, required: true }, // Estimated duration
});

module.exports = mongoose.model("Route", routeSchema);
