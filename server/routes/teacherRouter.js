import express from "express";
import db from "../db/connection.js";
import { validateId, validateName, validatePassword } from "./validation.js";
import { keepKeys } from "../utils.js";
const teacherRouter = express.Router({ mergeParams: true })

teacherRouter.post("/login", async (req, res) => {
  if (req.body != null && req.body.user_id != null && req.body.pw != null) {
    await db.loginUser(req.body.user_id, req.body.pw, "teacher")
      .then(data => {
        if (data == null) {
          res.status(400).json({ message: "Invalid login information" })
        } else {
          res.status(200).json(keepKeys(data, ["fname", "lname", "role", "user_id"]))
        }
      })
  } else {
    res.status(400).json({ message: "No user information found" });
  }
});

teacherRouter.get("/courses", async (req, res) => {
  if (req.query != null && req.query.teacher_id != null && req.query) {
    await db.getTeacherCourses(req.query.teacher_id).then((data) => {
      if (data == null) {
        res.status(400).json({ message: "No course found" });
      } else {
        res.status(200).json(data);
      }
    });
  } else {
    res.status(400).json({ message: "No course information found" });
  }
});

teacherRouter.get("/courseDetails", async (req, res) => {
  if (req.query != null && req.query.course_id != null && req.query) {
    await db.getCourseDetails(req.query.course_id).then((data) => {
      if (data == null) {
        res.status(400).json({ message: "No course found" });
      } else {
        res.status(200).json(data);
      }
    });
  } else {
    res.status(400).json({ message: "No course information found" });
  }
});

teacherRouter.post("/register", async (req, res) => {
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
        .json({ message: "Invalid Teacher ID. Needs to be 8 digits" });
    } else if (!isPasswordValid) {
      res.status(400).json({
        message:
          "Invalid password. Must be 8 characters long with lowercase, uppercase and special",
      });
    } else {
      const userAlreadyExists = await db.getUser(req.query.user_id)
      if (!userAlreadyExists) {
        await db.addUser(req.query.fname, req.query.lname, "teacher", req.query.user_id, req.query.pw)
          .then(data => {
            if (data == null) {
              res.status(400).json({ message: "Could not register new user" })
            } else {
              res.status(200).json(req.query)
            }
          })
      } else {
        return res.status(400).json({ message: "User already exists" })
      }
    }
  }
});

export default teacherRouter;
