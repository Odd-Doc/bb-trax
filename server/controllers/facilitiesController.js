import { FacilityImport } from "../models/facilityImport.model.js";
export const findFacility = async (req, res) => {
  var id = req.params.id;
  try {
    const found = await FacilityImport.findById(id).lean();
    res.json(found);
  } catch (err) {
    console.error(err);
  }
};
export const atlasQueryFacility = async (req, res) => {
  const { query } = req.query; // Take search query from request
  try {
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
  } catch (err) {
    console.error(err);
  }
};
export const findAllFacilities = async (req, res) => {
  try {
    const allFacilities = await FacilityImport.find()
      .select({ name: 1, street: 1, city: 1, state: 1, zip: 1 })
      .lean();
    res.json(allFacilities);
  } catch (err) {
    console.error(err);
  }
};
export const addNewFacility = async (req, res) => {
  try {
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
  } catch (err) {
    console.error(err);
  }
};

export const importFacilities = async (req, res) => {
  try {
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
  } catch (err) {
    console.error(err);
  }
};

export const addDeviceToFacility = async (req, res) => {
  try {
    var facilityId = req.params.facilityId;
    var deviceId = req.params.deviceId;
    const device = await Device.findById(deviceId);

    const facility = await FacilityImport.findOneAndUpdate(
      { _id: facilityId },
      { $push: { devices: device } }
    ).then((data) => res.json(data));
  } catch (err) {
    console.error(err);
  }
};
export const deleteFacility = async (req, res) => {
  try {
    var id = req.params.id;
    const found = await FacilityImport.deleteOne({ _id: id });
    res.json(found);
  } catch (err) {
    console.error(err);
  }
};
export const deleteAllFacilities = async (req, res) => {
  try {
    var id = req.params.id;
    const found = await FacilityImport.deleteMany();
    res.json(found);
  } catch (err) {
    console.error(err);
  }
};
