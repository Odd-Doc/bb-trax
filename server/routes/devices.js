import express from "express";
import { FacilityImport } from "../models/facilityImport.model.js";
import { Device } from "../models/device.model.js";
import {
  addDeviceCoordinates,
  addNewDevice,
  deleteDevice,
  findFacilityDevice,
} from "../controllers/devicesController.js";

const devicesRouter = express.Router();

devicesRouter.post("/device/new", (req, res) => {
  addNewDevice(req, res);
});
devicesRouter.get("/device/:facilityId/:deviceId", (req, res) => {
  findFacilityDevice(req, res);
});

devicesRouter.delete("/device/delete/:id", (req, res) => {
  deleteDevice(req, res);
});
devicesRouter.get(
  "/device/addCoords/:facilityId/:deviceId/:long/:lat",
  (req, res) => {
    addDeviceCoordinates(req, res);
  }
);

export default devicesRouter;
