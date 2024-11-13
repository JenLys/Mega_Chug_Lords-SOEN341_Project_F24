import express from "express";
import { initDb as db } from "../db/connection.js";
import { validateId, validateName, validatePassword } from "./validation.js";
import { keepKeys } from "../utils.js";
const studentRouter = express.Router({ mergeParams: true });

studentRouter.post("/login", async (req, res) => {
  if (req.body != null && req.body.user_id != null && req.body.pw != null) {
    await db
      .loginUser(req.body.user_id, req.body.pw, "student")
      .then((data) => {
        if (data == null) {
          res.status(400).json({ message: "Invalid login information" });
        } else {
          res
            .status(200)
            .json(keepKeys(data, ["fname", "lname", "role", "user_id"]));
        }
      });
  } else {
    res.status(400).json({ message: "No user information found" });
  }
});

studentRouter.get("/courses", async (req, res) => {
  if (req.query != null && req.query.student_id != null) {
    await db.getStudentCourses(req.query.student_id).then((data) => {
      if (data == null) {
        res.status(400).json({ message: "Could not get courses" });
      } else {
        res.status(200).json(data);
      }
    });
  } else {
    res.status(400).json({ message: "No student information found" });
  }
});

studentRouter.post("/all-courses-not-enrolled", async (req, res) => {
  if (req.body != null && req.body.user_id != null) {
    await db
      .getCoursesStudentNotEnrolledIn(req.body.user_id)
      .then((data) => res.status(200).json(data))
      .catch((err) => res.status(400).json({ message: err.message }));
  } else {
    res.status(400).json({ message: "Invalid student information provided" });
  }
});

studentRouter.post("/enroll-course", async (req, res) => {
  if (
    req.body != null &&
    req.body.course_id != null &&
    req.body.student_id != null
  ) {
    await db
      .addUserToCourse(req.body.student_id, req.body.course_id)
      .then((data) => {
        if (data != null) {
          res.status(200).json(data);
        } else {
          res.status(400).json({ message: "Student already in course" });
        }
      });
  } else {
    res
      .status(400)
      .json({ message: "No course information or student information found" });
  }
});

studentRouter.post("/register", async (req, res) => {
  if (
    req.body != null &&
    req.body.fname != null &&
    req.body.lname != null &&
    req.body.user_id != null &&
    req.body.pw != null
  ) {
    const isPasswordValid = validatePassword(req.body.pw);
    const isFirstNameValid = validateName(req.body.fname);
    const isLastNameValid = validateName(req.body.lname);
    const isUserValid = validateId(req.body.user_id);
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
          req.body.fname,
          req.body.lname,
          "student",
          req.body.user_id,
          req.body.pw
        )
        .then((data) => {
          if (data == null) {
            res.status(400).json({ message: "Could not register new user" });
          } else {
            res.status(200).json(req.body);
          }
        });
    }
  }
});

studentRouter.use(function (_, res) {
  res.status(404).send("NOT FOUND");
});

export default studentRouter;
