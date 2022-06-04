import express from "express";
import { getPlaces, newPlace } from "../controllers/placeController.js";

const router = express.Router();

router.get("/", getPlaces);
router.post("/", newPlace);

module.exports = router;
