import express from "express";
import {} from "dotenv/config";
import cors from "cors";
import connectDB from "./config/db";

import placeRoutes from "./routes/placeRoutes";
import userRoutes from "./routes/userRoutes";

const port = process.env.PORT || 8080;

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/places", placeRoutes);
app.use("/users", userRoutes);

app.get("/", (req, res) => res.send("Final project"));

app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
