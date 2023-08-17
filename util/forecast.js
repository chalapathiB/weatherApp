const request = require("request");
const forecast = (longitude, latitude, callback) => {
  console.log("forecast function is running");
  const url = `https://api.weatherapi.com/v1/current.json?key=b03731ce4f874c72b7494242231707&query=${longitude},${latitude}`;
  request({ url: url, json: true }, (error, response) => {
    if (error) {
      return callback("Network connection is failed", undefined);
    } else if (response.body.location == undefined) {
      return callback("no matched location", undefined);
    } else {
      return callback(undefined, { msg: "The Temperature is " + response.body.current.temp_c + " So the weather may be predicted as " + response.body.current.condition.text, icon: response.body.current.condition.icon });
    }
  });
};
// forecast(13.37, 78.59, (err, res) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(res);
// });

module.exports = {
  forecast: forecast,
  request: request
};
