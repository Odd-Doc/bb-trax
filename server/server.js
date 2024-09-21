import { MongoClient, ServerApiVersion } from "mongodb";
import "dotenv/config.js";
import express from "express";
import mongoose, { set } from "mongoose";
import cors from "cors";
import { Facility } from "./models/facility.model.js";
import { Device } from "./models/device.model.js";
import { FacilityImport } from "./models/facilityImport.model.js";

const uri = process.env.DB_URI;
const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect(uri);
var collection;
//////////////////////////////////////////
/// FACILITY----------------------------
//////////////////////////////////////////

app.get("/facilities", async (req, res) => {
  const found = await FacilityImport.find()
    .select({ company: 1, address: 1, devices: 1, locationid: 1 })
    .lean();
  res.json(found);
});

app.get("/facility/search", async (req, res) => {
  const { query } = req.query; // Take search query from request

  const found = await FacilityImport.aggregate([
    {
      $search: {
        index: "facility",
        text: {
          query: query,
          path: {
            wildcard: "*",
          },
        },
      },
    },
  ]).then((e) => {
    res.json(e);
  });
});
app.get("/facility/:id", async (req, res) => {
  var id = req.params.id;

  const found = await FacilityImport.findById(id).lean();

  res.json(found);
});
app.get("/facilities", async (req, res) => {
  const allFacilities = await FacilityImport.find()
    .select({ name: 1, street: 1, city: 1, state: 1, zip: 1 })
    .lean();
  res.json(allFacilities);
});
app.post("/facility/new", (req, res) => {
  const newFacility = new FacilityImport({
    name: req.body.name,
    street: req.body.street,
    city: req.body.city,
    state: req.body.state,
    zip: req.body.zip,
    locationId: req.body.locationId,
  });
  newFacility.save();
  res.json(newFacility);
});
app.post("/facility/newImport", (req, res) => {
  const newFacility = new FacilityImport({
    locationid: req.body.locationId,
    company: req.body.company,
    address: req.body.address,
    city: req.body.city,
    state: req.body.state,
    zip: req.body.zip,
    phone: req.body.phone,
    devices: req.body.devices,
    testdue: req.body.testdue,
  });

  newFacility.save();
  res.json(newFacility);
});
app.put("/facility/update/:facilityId/:deviceId", async (req, res) => {
  var facilityId = req.params.facilityId;
  var deviceId = req.params.deviceId;
  const device = await Device.findById(deviceId);

  const facility = await FacilityImport.findOneAndUpdate(
    { _id: facilityId },
    { $push: { devices: device } }
  ).then((data) => res.json(data));
});
app.delete("/facility/delete/:id", async (req, res) => {
  var id = req.params.id;
  // const found = await Device.findById(id).lean();
  const found = await FacilityImport.deleteOne({ _id: id });
  res.json(found);
});
//delete all
app.delete("/facility/delete", async (req, res) => {
  var id = req.params.id;
  // const found = await Device.findById(id).lean();
  const found = await FacilityImport.deleteMany();
  res.json(found);
});
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
//////////////////////////////////////////
/// END FACILITY----------------------------
//////////////////////////////////////////
//////////////////////////////////////////
/// DEVICE----------------------------
//////////////////////////////////////////
app.post("/device/new", (req, res) => {
  const newDevice = new Device({
    manufacturer: req.body.manufacturer,
    model: req.body.model,
    size: req.body.size,
    type: req.body.type,
    serialNumber: req.body.serialNumber,
    locationDescription: req.body.locationDescription,
    location: req.body.location,
  });
  newDevice.save();

  res.json(newDevice);
});
app.get("/device/:id", async (req, res) => {
  var id = req.params.id;
  const found = await Device.findById(id).lean();
  res.json(found);
});

app.delete("/device/delete/:id", async (req, res) => {
  var id = req.params.id;
  // const found = await Device.findById(id).lean();
  const found = await Device.deleteOne({ _id: id });
  res.json(found);
});

//////////////////////////////////////////
/// END DEVICE----------------------------
//////////////////////////////////////////

app.listen(3001, () => {
  console.log("Server started on port 3001");
});
