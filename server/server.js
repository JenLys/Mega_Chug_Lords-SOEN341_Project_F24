import express from "express";
import cors from "cors";
import api from "./routes/api.js";
import bodyParser from "body-parser";

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", api);
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.static(__dirname));

app.use(function (_, res) {
  res.status(404).send("404 NOT FOUND");
});

app.post("/submit", (req, res) => {
  console.log(req.body);
  res.json({ message: "Form submitted successfully!" });
});

// start the Express server
app.listen(PORT, () => {
  console.log(`Backend server listening on port ${PORT}`);
});
