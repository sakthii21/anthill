const express = require('express');

const {createBus,getBuses,updateBus,deleteBus,getBusById} = require("../controllers/busController")
const { auth, adminMiddleware } = require("../middleware/auth");

const Router = express.Router();

Router.post("/",auth,adminMiddleware,createBus);//Add a bus
Router.get("/", getBuses); // Get all buses
Router.get("/get/:busId", getBusById);
Router.put("/:busId",auth,adminMiddleware, updateBus); // Update bus details
Router.delete("/:busId", auth,adminMiddleware,deleteBus); // Delete a bus

module.exports = Router;