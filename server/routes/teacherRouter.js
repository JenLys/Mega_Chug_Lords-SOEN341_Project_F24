import express from "express";
import db from "../db/connection.js"
import Course from "../db/schemas/course.js"
import { validateId, validateName, validatePassword } from "./validation.js";
const teacherRouter = express.Router({ mergeParams: true })


{/*Added validation-- just like for /registration route  *PR comment */}
const validateProfId = (profId) => {
  if (!profId || typeof profId !== 'string') {
    return false;
  }
  return profId.length >= 8; //prof id should have at least 8 characters
};


teacherRouter.get("/login", async (req, res) => {
  if (req.query != null && req.query.user_id != null && req.query.pw != null) {
    await db.getUserLogin(req.query.user_id, req.query.pw)
      .then(data => {
        if (data == null) {
          res.status(400).json({ message: "Invalid login information" })
        } else {
          //Store prof id in session (if successful login)
          req.session.profId = data.prof_id;
          res.status(200).json(req.query)
        }
      })
  } else {
    res.status(400).json({ message: "No user information found" })
  }
})

//Get the courses
teacherRouter.get("/courses", async (req, res) => {
  try {
    //get prof id from query or session
    const profId = req.query.prof_id || req.session.profId;

    if (!validateProfId(profId)) { //validation
      return res.status(400).json({
        message: "Invalid professor ID."
      });
    }

    // Find courses by prof id
    const courses = await Course.find({ prof_id: profId });
    res.json(courses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});


teacherRouter.post("/register", async (req, res) => {
  if (req.query != null && req.query.fname != null && req.query.lname != null && req.query.user_id != null && req.query.pw != null) {
    const isPasswordValid = validatePassword(req.query.pw)
    const isFirstNameValid = validateName(req.query.fname)
    const isLastNameValid = validateName(req.query.lname)
    const isUserValid = validateId(req.query.user_id)
    if (!isFirstNameValid) {
      res.status(400).json({ message: "Invalid first name. First name needs to be between 2 and 70 characters" })
    } else if (!isLastNameValid) {
      res.status(400).json({ message: "Invalid last name. Last name needs to be between 2 and 70 characters" })
    } else if (!isUserValid) {
      res.status(400).json({ message: "Invalid Teacher ID. Needs to be 8 digits" })
    } else if (!isPasswordValid) {
      res.status(400).json({ message: "Invalid password. Must be 8 characters long with lowercase, uppercase and special" })
    } else {
      await db.addUser(req.query.fname, req.query.lname, "teacher", req.query.user_id, req.query.pw)
        .then(data => {
          if (data == null) {
            res.status(400).json({ message: "Could not register new user" })
          } else {
            res.status(200).json(req.query)
          }
        })
    }
  }
})

//default
teacherRouter.use(function (_, res) {
  res.status(404).send("NOT FOUND");
});

export default teacherRouter;