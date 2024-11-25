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

studentRouter.post("/summary", async (req, res) => {
  if (req.body != null && req.body.student_id) {
    const reviews = await db.getAllReviewsForStudent(req.body.student_id)
    res.status(200).json(reviews)
  } else {
    res.status(400).json({ message: "No user information found" });
  }
})

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

studentRouter.get("/in-team", async (req, res) => {
  if (
    req.query != null &&
    req.query.student_id != null &&
    req.query.course_id != null
  ) {
    await db
      .getIsInTeam(req.query.student_id, req.query.course_id)
      .then((data) => {
        if (data === null) {
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
      const userAlreadyExists = await db.getTeacher(req.body.user_id);
      if (!userAlreadyExists) {
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
      } else {
        return res.status(400).json({ message: "User already exists" });
      }
    }
  }
});

studentRouter.get("/team/:courseId", async (req, res) => {
  const { courseId } = req.params;

  try {
    // Fetching the course group and its associated members from the database
    const course = await db.getCourseById(courseId);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    const studentIds = course.student_ids; // Assuming this is an array of student IDs
    const teamMembers = await Promise.all(
      studentIds.map((id) => db.getUser(id))
    );

    // Check if any team members were found
    if (teamMembers.length > 0) {
      res.status(200).json(teamMembers);
    } else {
      res.status(404).json({ message: "No team members found" });
    }
  } catch (error) {
    console.error("Error fetching team members:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

studentRouter.use(function (_, res) {
  res.status(404).send("NOT FOUND");
});

export default studentRouter;
