const path = require("path");
const express = require("express");
const hbs = require("hbs");
const app = express();
const request = require("request");
const { geocode } = require("../util/geocode");
const { forecast } = require("../util/forecast");

//Setup of Path Directory
const pathdirectory = path.join(__dirname, "../public");
const temppathdirectory = path.join(__dirname, "../templates/views");
const hbspathdirectory = path.join(__dirname, "../templates/partials");

//Setup of views directory locations
app.set("view engine", "hbs");
app.set("views", temppathdirectory);
hbs.registerPartials(hbspathdirectory);

//Setup of Static directory to use it
app.use(express.static(pathdirectory));

//Setup of Routers
app.get("/index", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "chalapathi"
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Chalapathi"
  });
});

app.get("/amazon", (req, res) => {
  res.render("amazon", {
    na: "na"
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send("No search is Provided");
  }
  console.log(req.query.search);
  return res.send({
    products: []
  });
});
////////////////////////////////////////////////////////////
app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Address is not provided . Please Provide the Address "
    });
  }
  geocode(req.query.address, (err, { latitude, longitude, location } = {}) => {
    if (err) {
      return res.send({ err });
    }
    forecast(latitude, longitude, (err, forecastData) => {
      if (err) {
        return res.send({ err });
      }
      res.send({
        forecast: forecastData,
        location: location,
        address: req.query.address
      });
    });
  });
});
///////////////////////////////////////////////////////////////
app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help Me",
    name: "Chalapathi"
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404 error",
    name: "Four Zero Four",
    errormessage: "Page Not Found"
  });
});

app.listen(3000, () => {
  console.log("server is up on Port 3000");
});
