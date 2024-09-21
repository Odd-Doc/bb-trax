import mongoose from "mongoose";

const Schema = mongoose.Schema;

//backflow device schema & model

const deviceGeoSchema = new Schema({
  lat: { type: String },
  long: { type: String },
});

export const DeviceGeo = mongoose.model("device-geos", deviceGeoSchema);
