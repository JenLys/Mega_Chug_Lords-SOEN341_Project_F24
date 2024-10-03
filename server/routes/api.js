import express from "express";
import db from "../db/connection.js";
import User from "../db/schemas/user.js";
import TempUser from "../models/tempUser.js"; // Assuming you save it as tempUser.js
const {
  validateStudentId,
  validateName,
  validatePassword,
  validateUserData,
} = require("../components/validation.js");

const router = express.Router();

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


import studentLogin from "./studentLogin.js"

router.use(express.json());
router.use(express.urlencoded({extended:true}));


router.get("/hello", (_, res) => {
  res.json({ hello: "world" });
});

router.get("/login/student", (req, res) => {
  console.log("Student login page");
  res.end();
})

/* router.post("/login/student", async (req, res) => {
  const dbUser = await db.getUser(req.body.user_id);

  if (!dbUser) // dbUser is null, does not exist in db
  {
    res.sendStatus(401);
  } 
  
  else
  {
    if (req.body.pw !== dbUser.pw) // Passwords do not match
    {
      console.log("Incorrect password.")
      res.sendStatus(401);
    } 
  }

  res.sendStatus(200) // Login successful
  
  // Redirect to login page with a successful signup popup message
}) */

router.post("/login/student", studentLogin);

export default router;
