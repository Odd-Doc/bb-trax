import mongoose from "mongoose";
import { Device } from "./device.model.js";
const Schema = mongoose.Schema;

//backflow device schema & model

const facilitySchema = new Schema({
  name: { type: String, required: true },
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zip: { type: Number, required: true },
  locationId: { type: Number },
  devices: [Device.schema],
});

export const Facility = mongoose.model("facilities", facilitySchema);
