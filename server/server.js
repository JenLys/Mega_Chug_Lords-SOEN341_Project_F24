import express from "express";
import cors from "cors";
import api from "./routes/api.js";
import bodyParser from "body-parser";

const PORT = process.env.BACKEND_PORT || 5050;
const app = express();

const corsOptions = {
  origin: "https://reviewmate.onrender.com", // Replace with your frontend domain
  methods: "GET,POST,OPTIONS",
  allowedHeaders: "Content-Type, Authorization",
};

if (process.env.BACKEND_PORT) {
  app.use(cors(corsOptions));
} else {
  app.use(cors())
}

app.use(bodyParser.json());
app.use("/api", api);
app.use(bodyParser.urlencoded({ extended: true }));

app.use((_, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // Change * to your frontend domain
  res.header("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
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
