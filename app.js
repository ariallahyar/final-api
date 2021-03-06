import express from "express";
import {} from "dotenv/config";
import cors from "cors";
import connectDB from "./config/db";
import { errorHandler } from "./middlewear/errorMiddlewear";

import placeRoutes from "./routes/placeRoutes";
import userRoutes from "./routes/userRoutes";
import recommendationRoutes from "./routes/recommendationRoutes";
import societyRoutes from "./routes/societyRoutes";

const port = process.env.PORT || 8080;

connectDB();

const app = express();

app.use(cors()); // allows all origins
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/place", placeRoutes);
app.use("/user", userRoutes);
app.use("/recommendation", recommendationRoutes);
app.use("/society", societyRoutes);

app.use(errorHandler);

app.get("/", (req, res) => res.send("Final project"));

app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
