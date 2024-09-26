import express from "express";
// import db from "../db/connection.js"
import { ObjectId } from "mongodb";
const router = express.Router();

//student registration
router.post("/studentreg", (req, res) => {
  const { studentId, username, password } = req.body;
  //logic to save student registration data to the database here
  res.json({ message: "Student registered successfully", data: req.body });
});

// teacher registration
router.post("/teacherreg", (req, res) => {
  const { username, password } = req.body;
  // logic to save teacher registration data to the database here
  res.json({ message: "Teacher registered successfully", data: req.body });
});

router.get("/hello", (_, res) => {
  res.json({ hello: "world" });
});

export default router;
