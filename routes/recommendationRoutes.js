import express from "express";
import { authorize } from "../controllers/userController";
import { getRecommendations, submitRecommendation } from "../controllers/recommendationController";

const router = express.Router();

router.get("/", getRecommendations);
router.post("/", authorize, submitRecommendation);

module.exports = router;
