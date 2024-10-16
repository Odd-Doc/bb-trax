import { Device } from "../models/device.model.js";
import { FacilityImport } from "../models/facilityImport.model.js";
export const addNewDevice = async (req, res) => {
  const newDevice = new Device({
    manufacturer: req.body.manufacturer,
    model: req.body.model,
    size: req.body.size,
    type: req.body.type,
    serialNumber: req.body.serialNumber,
    locationDescription: req.body.locationDescription,
    location: req.body.location,
  });
  try {
    newDevice.save();
    res.json(newDevice);
  } catch (err) {
    console.error(err);
  }
};
export const findFacilityDevice = async (req, res) => {
  var deviceId = req.params.deviceId;
  var facilityId = req.params.facilityId;
  try {
    const found = await FacilityImport.findOne({
      _id: facilityId,
    });
    // const found = await Device.findById(id).lean();
    res.json(found);
  } catch (err) {
    console.error(err);
  }
};
export const deleteDevice = async (req, res) => {
  try {
    var id = req.params.id;
    // const found = await Device.findById(id).lean();
    const found = await Device.deleteOne({ _id: id });
    res.json(found);
  } catch (err) {
    console.error(err);
  }
};
export const addDeviceCoordinates = async (req, res) => {
  var deviceId = req.params.deviceId;
  var facilityId = req.params.facilityId;
  var lat = req.params.lat;
  var long = req.params.long;
  try {
    const device = await FacilityImport.findOne({
      _id: facilityId,
    })
      .then((facility) => {
        const device = facility.devices.id(deviceId);
        device.location = {
          type: "Point",
          coordinates: [40.73061, -73.935242],
        };
        return facility.save(); // saves document with subdocuments and triggers validation
      })
      .then((facility) => {
        res.send({ facility });
      });
  } catch (err) {
    console.error(err);
  }
};
