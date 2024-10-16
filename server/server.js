import { MongoClient, ServerApiVersion } from "mongodb";
import "dotenv/config.js";
import express from "express";
import mongoose, { set } from "mongoose";
import cors from "cors";
import { Facility } from "./models/facility.model.js";
import { Device } from "./models/device.model.js";
import facilitiesRouter from "./routes/facilities.js";
import devicesRouter from "./routes/devices.js";
const uri = process.env.DB_URI;
const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect(uri);

app.use("/", facilitiesRouter);
app.use("/", devicesRouter);

// app.post("/facility/device/add", (req, res) => {
//   const newDevice = new Device({
//     manufacturer: req.body.manufacturer,
//     model: req.body.model,
//     size: req.body.size,
//     type: req.body.type,
//     serialNumber: req.body.serialNumber,
//     locationDescription: req.body.locationDescription,
//     location: req.body.location,
//   });
//   newDevice.save();

//   res.json(newDevice);
// });

app.listen(3001, () => {
  console.log("Server started on port 3001");
});
