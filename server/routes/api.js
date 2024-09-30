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

// Student registration
router.post("/studentreg", async (req, res) => {
  const { studentid, firstname, lastname, password } = req.body;

  // Validate the user data
  const validation = validateUserData({
    studentid,
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
      user_id: studentid,
      pw: password,
    });

    await newUser.save();
    res
      .status(201)
      .json({ message: "Student registered successfully", data: newUser });
  } catch (error) {
    res.status(500).json({
      message: "Error saving student to the database",
      error: error.message,
    });
  }
});

// Teacher registration
router.post("/teacherreg", async (req, res) => {
  const { teacherid, firstname, lastname, password } = req.body;

  // Validate info
  const validation = validateUserData({
    teacherid,
    firstname,
    lastname,
    password,
  });

  // If validation fails, return a 400 status with the error message
  if (!validation.valid) {
    return res.status(400).json({ message: validation.message });
  }

  try {
    // Save teacher data into the database
    const newTeacher = new TempUser({
      fname: firstname,
      lname: lastname,
      role: "teacher",
      user_id: teacherid,
      pw: password,
    });

    await newTeacher.save();
    res
      .status(201)
      .json({ message: "Teacher registered successfully", data: newTeacher });
  } catch (error) {
    res.status(500).json({
      message: "Error saving teacher to the database",
      error: error.message,
    });
  }
});

// Close the router
export default router;
