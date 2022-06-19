import express from "express";
import { getSubscriberList, submitEmail } from "../controllers/societyController";

const router = express.Router();

router.get("/", getSubscriberList);
router.post("/", submitEmail);

module.exports = router;
