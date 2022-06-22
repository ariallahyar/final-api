import fetch from "node-fetch";
import Place from "../models/place";
import asyncHandler from "express-async-handler";

// @desc		Get place details from Place API
const getPlace = asyncHandler(async (id) => {
  const fields =
    "formatted_address,name,photo,geometry/location,place_id,type,url,vicinity,website";
  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${id}&fields=${fields}&key=${process.env.GOOGLE_MAPS_API_KEY}`;
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }

    const data = await response.json();
    return data.result;
  } catch (error) {
    console.log(error);
  }
});

// @desc	  Get places
// @route		GET /place
const getPlaces = asyncHandler(async (req, res) => {
  const { city } = req.query;
  let queries = {};

  if (city) {
    queries.city = city;
  }

  const placesDB = await Place.find(queries);
  const placesGoogle = await Promise.all(placesDB.map((place) => getPlace(place.google_place_id)));

  let merged = [];

  for (let i = 0; i < placesDB.length; i++) {
    merged.push({
      ...placesDB[i]._doc,
      ...placesGoogle.find((item) => item.place_id === placesDB[i].google_place_id),
    });
  }

  const results = merged.map(({ google_place_id, _id, __v, ...result }) => result);

  res.status(200).json({
    success: true,
    total: results.length,
    results: results,
  });
});

// @desc		Set new place
// @route		POST /place
const newPlace = asyncHandler(async (req, res) => {
  const { google_place_id, city, description, tags } = req.body;
  const place = await Place.create({ google_place_id, city, description, tags });

  if (!place) {
    res.status(400);
    throw new Error("Please add a body");
  }

  res.status(201).json({
    success: true,
    created: place,
  });
});

// @desc	  Get photo
// @route		GET /place/photo
const getPhoto = asyncHandler(async (req, res) => {
  const { photo_ref } = req.query;

  const url = `https://maps.googleapis.com/maps/api/place/photo?photo_reference=${photo_ref}&maxwidth=400&key=${process.env.GOOGLE_MAPS_API_KEY}`;

  res.send(url);
});

module.exports = {
  getPlaces,
  newPlace,
  getPhoto,
};
