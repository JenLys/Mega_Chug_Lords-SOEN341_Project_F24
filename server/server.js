import express from "express";
import cors from "cors";
import api from "./routes/api.js";
import bodyParser from "body-parser";

const PORT = process.env.BACKEND_PORT || 5050;
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use("/api", api);
app.use(bodyParser.urlencoded({ extended: true }));

app.use((_, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // Change * to your frontend domain
  res.header("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.options("/*", (_, res) => {
  res.sendStatus(204); // No content for OPTIONS request
});

app.use(function (_, res) {
  res.status(404).send("404 NOT FOUND");
});

// start the Express server
app.listen(PORT, () => {
  console.log(`Backend server listening on port ${PORT}`);
});
