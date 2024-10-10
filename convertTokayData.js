import axios from "axios";
import { Device } from "./server/models/device.model";
import { FacilityImport } from "./server/models/facilityImport.model.js";
// const API_BASE = process.env.EXPO_PUBLIC_NGROCK_URL;
// import jsonData from "./data.json";

const API_BASE = "http://localhost:3001";

const preProcessData = (data) => {
  return new Promise((resolve) => {
    const companies = [];
    // axios
    //   .get(API_BASE + "/facilities/search")
    //   .then(() => {
    //     //hazards data
    //     console.log("found facility...");
    for (let i = 0; i < data.length; i++) {
      var tempFacility = new FacilityImport();
      for (const key in data[i]) {
        switch (key) {
          case "sites_locationid":
            if (!companies.includes(data[i][key]))
              tempFacility.locationid = data[i][key];
            break;
          case "sites_company":
            tempFacility.company = data[i][key];
            break;
          case "sites_address":
            tempFacility.address = data[i][key];
            break;
          case "sites_city":
            tempFacility.city = data[i][key];
            break;
          case "sites_state":
            tempFacility.state = data[i][key];
            break;
          case "sites_zip":
            tempFacility.zip = data[i][key];
            break;
          case "sitemailing_phone":
            tempFacility.phone = data[i][key];
            break;
          case "sites_testdue":
            tempFacility.testdue = data[i][key];
            break;
          default:
            break;
        }

        tempFacility.devices = [];
        companies.push(tempFacility);
      }
    }
    resolve(companies);
  });
};
const filterOutUniqueSites = (preprocessedArray) => {
  var progress = 0;
  return new Promise((resolve) => {
    var filteredCompanies = [];

    for (let j = 0; j < preprocessedArray.length; j++) {
      const prevIndex = preprocessedArray[j - 1];
      //hydrate new filtered array
      if (filteredCompanies.length == 0) {
        filteredCompanies.push(preprocessedArray[j]);
      }
      if (
        prevIndex != undefined &&
        prevIndex.locationid != preprocessedArray[j].locationid
      ) {
        //push non-duplicates to new array -> confirmed this is accurate list of indexes

        progress += 1;
        console.log(`uniuqe site data #${progress} found!`);
        filteredCompanies.push(preprocessedArray[j]);
      }
    }
    resolve(filteredCompanies);
  });
};
const hydrateDevices = (filteredArray, raw) => {
  var progress = 0;
  return new Promise((resolve) => {
    const res = filteredArray;
    for (let i = 0; i < res.length; i++) {
      for (const filteredKey in res[i]) {
        if (filteredKey == "locationid") {
          // track current filtered facility in loops
          var filteredId = res[i][filteredKey];
          for (let j = 0; j < raw.length; j++) {
            //create temp device before looping through object keys in raw source (JSON)
            var tempDevice = new Device();
            for (const rawKey in raw[j]) {
              // track current raw facility in loops
              var rawId = raw[j][rawKey];
              if (rawKey == "sites_locationid") {
                if (filteredId == rawId) {
                  for (const rawSearchKey in raw[j]) {
                    var rawDeviceInfo = raw[j][rawSearchKey];
                    // console.log(
                    //   `adding a device from: ${rawId} to ${filteredId} | deviceHazId = ${rawDeviceId}`
                    // );
                    switch (rawSearchKey) {
                      case "hazards_hazid":
                        tempDevice.hazid = rawDeviceInfo;
                        break;
                      case "hazards_hazardcat":
                        tempDevice.hazardcat = rawDeviceInfo;
                        break;
                      case "hazards_testdue":
                        tempDevice.testdue = rawDeviceInfo;
                        break;
                      case "hazards_lasttest":
                        tempDevice.lasttest = rawDeviceInfo;
                        break;
                      case "hazards_mfg":
                        tempDevice.manufacturer = rawDeviceInfo;
                        break;
                      case "hazards_model":
                        tempDevice._model = rawDeviceInfo;
                        break;
                      case "hazards_devsize":
                        tempDevice.size = rawDeviceInfo;
                        break;
                      case "hazards_serialnum":
                        tempDevice.serialNumber = rawDeviceInfo;
                        break;
                      case "hazards_location":
                        tempDevice.locationDescription = rawDeviceInfo;
                        break;
                      default:
                        break;
                    }
                  }
                  tempDevice.location = {
                    type: "Point",
                    coordinates: [0, 0],
                  };
                  progress += 1;
                  console.log(`hydrating device #${progress}!`);

                  res[i].devices.push(tempDevice);
                }
              }
            }
          }
        }
      }
    }

    resolve(res);
  });
};
// locationid: { type: Number },
// company: { type: String },
// address: { type: String },
// city: { type: String },
// state: { type: String },
// zip: { type: String },
// phone: { type: String },
// devices: { type: [Device.schema], required: false },
export default convertData = async (data) => {
  console.log("converting data");
  console.log("pre-processing data...");

  const preProcess = preProcessData(data);
  await preProcess;
  console.log("pre-processing complete!");
  // console.log(await preProcess);
  console.log("filtering out unique sites...");

  const filteredData = filterOutUniqueSites(await preProcess);

  console.log("filtering complete!");
  console.log("hydrating site devices from source...");

  const hydration = hydrateDevices(await filteredData, data)
    .then((data) => {
      data.forEach((element) => {
        fetch(API_BASE + "/facility/newImport", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            locationid: element.locationid,
            company: element.company,
            address: element.address,
            city: element.city,
            state: element.state,
            zip: element.zip,
            phone: element.phone,
            testdue: element.testdue,
            devices: element.devices,
          }),
        }).catch((err) => console.error("Error: ", err));
      });
    })
    .then(console.log("device hydration complete"));
};
////////////////////////////////////////
// Hydrate database----------------------
////////////////////////////////////////

////////////////////////////////////////
// END Hydrate database------------------
////////////////////////////////////////
// filteredCompanies.forEach((element) => {
//   console.log(element);
// });

// axios
//   .post(API_BASE + "/facility/newImport", {
//     name: keyName,
//     street: ,
//     city: { type: String },
//     state: { type: String },
//     zip: { type: Number },
//     locationId: { type: Number },
//     devices: { type: [Device.schema], required: false },
//   })
//   .then(console.log("importing..."))
//   .catch((err) => {
//     console.error(err);
//   });
