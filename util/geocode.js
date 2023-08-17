const request = require("request");
const geocode = (address, callback) => {
  console.log("geoCode function is running");

  const url = `https://api.maptiler.com/geocoding/${address}.json?key=YsPscMf6BKUjZanzItJv`;

  request({ url: url, json: true }, (error, response) => {
    if (error) {
      return callback("Network connection is failed", "geocode1");
    } else if (response.body.features[0] == undefined) {
      return callback("Location is not find", "geocode");
    } else {
      return callback(undefined, {
        latitude: response.body.features[0].center[1],
        longitude: response.body.features[0].center[0],
        location: response.body.features[0].place_name
      });
    }
  });
};

// geocode("!", (err, { latitude, longitude, location } = {}) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(latitude);
//     console.log(longitude);
//     console.log(location);
//   }
// });
module.exports = {
  geocode: geocode,
  request: request
};
