import Place from "../models/place";

const getOnePlace = async (id) => {
  const URL = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${id}&fields=place_id,formatted_address,name,photos&key=${process.env.GOOGLE_MAPS_API_KEY}`;
  try {
    const response = await fetch(URL);

    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.log(error);
  }
};

// @desc	  Get places
// @route		GET /places
const getPlaces = async (req, res) => {
  const placesDb = await Place.find();

  let googleApi = await Promise.all(placesDb.map((place) => getOnePlace(place.google_place_id)));
  googleApi = googleApi.map((result) => result.result);

  let merged = [];

  for (let i = 0; i < placesDb.length; i++) {
    const place = {
      ...placesDb[i]._doc,
      ...googleApi.find((itmInner) => itmInner.place_id === placesDb[i].google_place_id),
    };

    const placeFormatted = Object.keys(place)
      .sort()
      .reduce((obj, key) => {
        obj[key] = place[key];
        return obj;
      }, {});

    merged.push(placeFormatted);
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
