import express from "express";
import {} from "dotenv/config";
import cors from "cors";
import connectDB from "./config/db";

import placeRoutes from "./routes/placeRoutes";
import userRoutes from "./routes/userRoutes";
import recommendationRoutes from "./routes/recommendationRoutes";

const port = process.env.PORT || 8080;

connectDB();

const app = express();

app.use(cors()); // allows all origins
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/place", placeRoutes);
app.use("/user", userRoutes);
app.use("/recommendation", recommendationRoutes);

app.get("/", (req, res) => res.send("Final project"));

app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
