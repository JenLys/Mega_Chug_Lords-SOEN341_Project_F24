import express from "express";
import db from "../db/connection.js";
import { validateId, validateName, validatePassword } from "./validation.js";
const studentRouter = express.Router({ mergeParams: true });

studentRouter.get("/login", async (req, res) => {
  console.log(req);
  if (req.query != null && req.query.user_id != null && req.query) {
    await db.getUserLogin(req.query.user_id, req.query.pw).then((data) => {
      if (data == null) {
        res.status(400).json({ message: "Invalid login information" });
      } else {
        res.status(200).json(req.query);
      }
    });
  } else {
    res.status(400).json({ message: "No user information found" });
  }
});

studentRouter.post("/register", async (req, res) => {
  if (
    req.query != null &&
    req.query.fname != null &&
    req.query.lname != null &&
    req.query.user_id != null &&
    req.query.pw != null
  ) {
    const isPasswordValid = validatePassword(req.query.pw);
    const isFirstNameValid = validateName(req.query.fname);
    const isLastNameValid = validateName(req.query.lname);
    const isUserValid = validateId(req.query.user_id);
    if (!isFirstNameValid) {
      res.status(400).json({
        message:
          "Invalid first name. First name needs to be between 2 and 70 characters",
      });
    } else if (!isLastNameValid) {
      res.status(400).json({
        message:
          "Invalid last name. Last name needs to be between 2 and 70 characters",
      });
    } else if (!isUserValid) {
      res
        .status(400)
        .json({ message: "Invalid Student ID. Needs to be 8 digits" });
    } else if (!isPasswordValid) {
      res.status(400).json({
        message:
          "Invalid password. Must be 8 characters long with lowercase, uppercase and special",
      });
    } else {
      await db
        .addUser(
          req.query.fname,
          req.query.lname,
          "student",
          req.query.user_id,
          req.query.pw
        )
        .then((data) => {
          if (data == null) {
            res.status(400).json({ message: "Could not register new user" });
          } else {
            res.status(200).json(req.query);
          }
        });
    }
  }
});

studentRouter.get("/courses", async (req, res) => {
  const { user_id } = req.query;

  if (!user_id) {
    return res
      .status(400)
      .json({ message: "User ID is required to fetch courses" });
  }

  try {
    // Fetch courses for the student by user_id, assuming user_id is a field in your student data
    const courses = await Course.find(
      { student_id: user_id },
      "course_id number"
    ); // Adjust field names as per your schema

    if (!courses || courses.length === 0) {
      return res
        .status(404)
        .json({ message: "No courses found for this student" });
    }

    // Format the courses for frontend display (e.g., with random color)
    const formattedCourses = courses.map((course) => ({
      id: course.course_id,
      name: `${course.number}`, // Customize as needed
      color: getRandomColor(), // Optional: Add color dynamically if desired
    }));

    res.status(200).json(formattedCourses);
  } catch (error) {
    console.error("Error fetching courses:", error);
    res.status(500).json({ message: "Error fetching courses" });
  }
});

studentRouter.use(function (_, res) {
  res.status(404).send("NOT FOUND");
});

export default studentRouter;
