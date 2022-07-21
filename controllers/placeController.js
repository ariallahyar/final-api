import Place from "../models/place";
import asyncHandler from "express-async-handler";
import { Client } from "@googlemaps/google-maps-services-js";

const client = new Client({});
const API_KEY = process.env.GOOGLE_MAPS_API_KEY;

// @desc		Get place details from Place API
const getPlaceDetails = async (id) => {
  const response = await client
    .placeDetails({
      params: {
        fields: [
          "formatted_address",
          "name",
          "geometry/location",
          "place_id",
          "photo",
          "type",
          "url",
          "vicinity",
          "website",
        ],
        language: "en",
        place_id: id,
        key: API_KEY,
      },
      timeout: 1000, // milliseconds
    })
    .catch((err) => console.log(err));
  return response.data.result;
};

// @desc	  Get places
// @route		GET /place
const getPlaces = asyncHandler(async (req, res) => {
  const { city } = req.query;
  let queries = {};

  if (city) {
    queries.city = city;
  }

  const placesDB = await Place.find(queries);
  const placesGoogle = await Promise.all(
    placesDB.map((place) => getPlaceDetails(place.google_place_id))
  );

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

  const response = await client
    .placePhoto({
      params: {
        maxwidth: 500,
        photoreference: photo_ref,
        key: API_KEY,
      },
      timeout: 1000, // milliseconds
    })
    .catch((err) => console.log(err));
  res.send(response.data);
});

module.exports = {
  getPlaces,
  newPlace,
  getPhoto,
};
