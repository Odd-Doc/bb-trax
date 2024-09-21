import mongoose from "mongoose";

const Schema = mongoose.Schema;

//backflow device schema & model

// const deviceGeoSchema = new Schema({
//   lat: { type: String },
//   long: { type: String },
// });
const deviceGeoSchema = new Schema({
  type: {
    type: String, // Don't do `{ location: { type: String } }`
    enum: ["Point"], // 'location.type' must be 'Point'
    required: true,
  },
  coordinates: {
    type: [Number],
    required: true,
  },
});
const deviceSchema = new Schema({
  hazid: { type: Number },
  hazardcat: { type: String },
  testdue: { type: Date },
  lasttest: { type: Date },
  manufacturer: { type: String },
  _model: { type: String },
  size: { type: String },
  type: { type: String },
  serialNumber: { type: String },
  locationDescription: { type: String },
  location: deviceGeoSchema,
});

export const Device = mongoose.model("facility-device", deviceSchema);
