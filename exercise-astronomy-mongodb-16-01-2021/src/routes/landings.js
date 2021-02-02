const route = require("express").Router();

// Endpoints relativos a Landings
const LandingsModel = require("../models/Landings");
const fetch = require("node-fetch");
const geo = require("mapbox-geocoding");

const ACCESS_TOKEN =
  "pk.eyJ1IjoiemluZ2l0LWRldiIsImEiOiJja2k0ZHV2NjEyZnplMnptcGMxa2JoZmp3In0.DF8-X_GwEWZC7pOUsndbog";
geo.setAccessToken("ACCESS_TOKEN");
//punto 1
// next: `http://${req.headers.host}/landings?minimum_mass=${num}`

route.get("/", async (req, res, next) => {
  try {
    //  const { minimum_mass } = req.query;
    const num = +req.query.minimum_mass;

    const result = await LandingsModel.find(
      { mass: { $lte: num } },
      { _id: 0, name: 1, mass: 1 }
    );
    console.log("esto es result=>", result);
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("> error retrieving landings: ", error.message);

    next(new Error("error retrieving landings"));
  }
});
//punto 2
route.get("/mass/:mass", async (req, res, next) => {
  try {
    const mass = +req.params.mass;

    const result = await LandingsModel.find(
      { mass: mass },
      { _id: 0, name: 1, mass: 1 }
    );
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("> error retrieving landings: ", error.message);

    next(new Error("error retrieving landings"));
  }
});
//punto 3
route.get("/class/:recclass", async (req, res, next) => {
  try {
    const recclass = req.params.recclass;

    const result = await LandingsModel.find(
      { recclass: recclass },
      { _id: 0, name: 1, recclass: 1 }
    );
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("> error retrieving landings: ", error.message);

    next(new Error("error retrieving landings"));
  }
});
//punto 4
// next: `http://${req.headers.host}/landings/date?from=${y1}&to=${y2}`
route.get("/date", async (req, res, next) => {
  try {
    const { from, to } = req.query;

    const y1 = +req.query.from;
    const y2 = +req.query.to;

    console.log("esto es y1=>", y1);
    console.log("esto es y2=>", y2);

    const result = await LandingsModel.find({
      $or: [
        { $expr: { $gte: [{ $year: "$year" }, y1] } },
        { $expr: { $lte: [{ $year: "$year" }, y2] } },
      ],
    });

    console.log("esto es result=>", result);

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("> error retrieving landings: ", error.message);

    next(new Error("error retrieving landings"));
  }
});

//punto 5 - geolocation
route.get("/:name", async (req, res, next) => {
  try {
    const nameL = req.params.name;

    console.log("name", nameL);
    let city = "";

    const result = await LandingsModel.findOne(
      { name: nameL },
      {
        _id: 0,
        name: 1,
        geolocation: { latitude: 1, longitude: 1 },
        place: city,
      }
    );

    const lat = result.get("geolocation.latitude");
    const long = result.get("geolocation.longitude");
    console.log("latitude", lat);
    console.log("longitude", long);

    function getCity() {
      const urlMap = `https://api.mapbox.com/geocoding/v5/mapbox.places/${long},${lat}.json?access_token=pk.eyJ1IjoiemluZ2l0LWRldiIsImEiOiJja2k0ZHV2NjEyZnplMnptcGMxa2JoZmp3In0.DF8-X_GwEWZC7pOUsndbog`;

      return fetch(urlMap)
        .then((res) => res.json())
        .then((data) => {
          city = data.features[0].place_name;
          console.log("esto es city1=>", city);

          const finalRes = { ...result.toJSON(), place: city };

          res.status(200).json({
            success: true,
            data: finalRes,
          });
        });
    }
    getCity();
  } catch (error) {
    console.error("> error retrieving landings: ", error.message);
    next(new Error("error retrieving landings"));
  }
});

//punto 5 -otra manera de hacerlo- con mapbox-geocoding library(da error)
route.get("/getcity/:name", async (req, res, next) => {
  try {
    const nameL = req.params.name;

    console.log("name", nameL);

    const result = await LandingsModel.findOne(
      { name: nameL },
      {
        _id: 0,
        name: 1,
        geolocation: { latitude: 1, longitude: 1 },
      }
    );
    const lat = result.get("geolocation.latitude");
    const long = result.get("geolocation.longitude");
    console.log("latitude", lat);
    console.log("longitude", long);

    geo.reverseGeocode("mapbox.places", long, lat, function (err, geoData) {
      console.log("geoData=>", geoData);
      const city = geoData.features[0].place_name;
    });

    const finalRes = { ...result.toJSON(), place: city };

    res.status(200).json({
      success: true,
      data: finalRes,
    });
  } catch (error) {
    console.error("> error retrieving landings: ", error.message);
    next(new Error("error retrieving landings"));
  }
});
module.exports = route;
