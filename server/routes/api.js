import express from "express";
// import db from "../db/connection.js"
import { ObjectId } from "mongodb";
const router = express.Router();
const {
  validateStudentId,
  validateName,
  validatePassword,
  validateUserData,
} = require("../components/validation.js");

//student registration
router.post("/studentreg", (req, res) => {
  const { studentId, firstName, lastName, password } = req.body;

  // Validate the user data
  const validation = validateUserData({
    studentId,
    firstName,
    lastName,
    password,
  });

  // If validation fails, return a 400 status with the error message
  if (!validation.valid) {
    return res.status(400).json({ message: validation.message });
  }

  // Proceed to save student registration data to the database (pseudo-code)
  // database.saveStudent({ studentId, firstName, lastName, password })
  //   .then(() => {
  //     res.json({ message: "Student registered successfully", data: req.body });
  //   })
  //   .catch(err => {
  //     res.status(500).json({ message: "Error saving data", error: err.message });
  //   });

  // Temporary response until database logic is added
  res.json({ message: "Student registered successfully", data: req.body });
  module.exports = router;
});

// do a null check for each of the fields you are accessing or requesting, if null do something like //res.status(404).json({message:"Not valid input"});
// once not null, then you want to do validation: for studentid, check if it is positive and 8 digits long
//username should be changed to first name and lastname
// They  should be strings and from 2-100 characters
// For passwords you should check it is at least 10 xters long and alphanumeric
//better to make a file called validate and then have validate functions for all of these so you can call them and reuse them
//after everything, upload to the db and also have a error handling thing if the upload doesnt work like for res.status above

// teacher registration
router.post("/teacherreg", (req, res) => {
  const { username, password } = req.body;

  // Validate username (name) and password
  if (!validateName(username)) {
    return res.status(404).json({ message: "Invalid username" });
  }
  if (!validatePassword(password)) {
    return res.status(404).json({ message: "Invalid password" });
  }

  // If validation passes, proceed to save the teacher
  res.json({ message: "Teacher registered successfully", data: req.body });
});

router.get("/hello", (_, res) => {
  res.json({ hello: "world" });
});

export default router;
