import express from "express";
import { authorize } from "../controllers/userController";
import {
  getRecommendations,
  submitRecommendation,
  deleteRecommendation,
} from "../controllers/recommendationController";

const router = express.Router();

router.get("/", getRecommendations);
router.post("/", authorize, submitRecommendation);
router.delete("/", authorize, deleteRecommendation);

module.exports = router;
