import express from "express";
// import db from "../db/connection.js"
import { ObjectId } from "mongodb";
import TempUser from "../models/tempUser.js"; // Assuming you save it as tempUser.js
const router = express.Router();
const {
  validateStudentId,
  validateName,
  validatePassword,
  validateUserData,
} = require("../components/validation.js");

//student registration

router.post("/studentreg", async (req, res) => {
  const { studentId, firstname, lastname, password } = req.body;
  // Validate the user data
  const validation = validateUserData({
    studentId,
    firstname,
    lastname,
    password,
  });

  // If validation fails, return a 400 status with the error message
  if (!validation.valid) {
    return res.status(400).json({ message: validation.message });
  }

  try {
    const newUser = new TempUser({
      fname: firstname,
      lname: lastname,
      role: "student",
      user_id: studentId,
      pw: password, // Consider hashing
    });

    await newUser.save();
    res
      .status(201)
      .json({ message: "Student registered successfully", data: newUser });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error saving student to the database",
        error: error.message,
      });
  }
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
