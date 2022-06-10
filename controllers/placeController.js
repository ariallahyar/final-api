import fetch from "node-fetch";
import Place from "../models/place";

const getPlace = async (id) => {
  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${id}&fields=place_id,formatted_address,name,photos&key=${process.env.GOOGLE_MAPS_API_KEY}`;
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
};

// @desc	  Get places
// @route		GET /places
const getPlaces = async (req, res) => {
  const placesDB = await Place.find();
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
    results: results,
  });
};

// @desc		Set new place
// @route		POST /places
const newPlace = async (req, res) => {
  const { google_place_id, name, city, coordinates, description, tags } = req.body;
  const place = await Place.create({ google_place_id, name, city, coordinates, description, tags });

  if (!place) {
    res.status(400);
    throw new Error("Please add a body");
  }

  res.status(201).json({
    success: true,
    created: place,
  });
};

module.exports = {
  getPlaces,
  newPlace,
};