const mongoose = require("mongoose");

const busSchema = new mongoose.Schema({
  name: { type: String, required: true },
  number: { type: String, required: true, unique: true },
  capacity: { type: Number, required: true },
  route: { type: mongoose.Schema.Types.ObjectId, ref: "Route" }, // Reference to Route
});

module.exports = mongoose.model("Bus", busSchema);
