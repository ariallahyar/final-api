import express from "express";
import { getPlaces, newPlace, getPhoto } from "../controllers/placeController.js";

const router = express.Router();

router.get("/", getPlaces);
router.post("/", newPlace);
router.get("/photo", getPhoto);

module.exports = router;
