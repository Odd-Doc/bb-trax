import express from "express";
import { FacilityImport } from "../models/facilityImport.model.js";
import {
  addDeviceToFacility,
  addNewFacility,
  atlasQueryFacility,
  deleteAllFacilities,
  deleteFacility,
  findAllFacilities,
  findFacility,
  importFacilities,
} from "../controllers/facilitiesController.js";

const facilitiesRouter = express.Router();

facilitiesRouter.get("/facilities", async (req, res) => {
  const found = await FacilityImport.find()
    .select({ company: 1, address: 1, devices: 1, locationid: 1 })
    .lean();
  res.json(found);
});

facilitiesRouter.get("/facility/search", (req, res) => {
  atlasQueryFacility(req, res);
});
facilitiesRouter.get("/facility/:id", (req, res) => {
  findFacility(req, res);
});
facilitiesRouter.get("/facilities", (req, res) => {
  findAllFacilities(req, res);
});
facilitiesRouter.post("/facility/new", (req, res) => {
  addNewFacility(req, res);
});
facilitiesRouter.post("/facility/newImport", (req, res) => {
  importFacilities(req, res);
});
facilitiesRouter.put("/facility/update/:facilityId/:deviceId", (req, res) => {
  addDeviceToFacility(req, res);
});
facilitiesRouter.delete("/facility/delete/:id", (req, res) => {
  deleteFacility(req, res);
});
//delete all
facilitiesRouter.delete("/facility/delete", (req, res) => {
  deleteAllFacilities(req, res);
});
export default facilitiesRouter;
