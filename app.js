import express from "express";
import cors from "cors";

const port = process.env.PORT || 8080;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => res.send("Final project"));

app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
