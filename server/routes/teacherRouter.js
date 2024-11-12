import express from "express";
import { initDb as db } from "../db/connection.js"
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
  if (req.query != null && req.query.prof_id != null && req.query) {
    await db.getTeacherCourses(req.query.prof_id).then((data) => {
      if (data == null) {
        res.status(400).json({ message: "No course found" });
      } else {
        res.status(200).json(data);
      }
    }).catch(err => {
      res.status(404).json({ message: err.message })
    })
  } else {
    res.status(400).json({ message: "No course information found" });
  }
});

teacherRouter.get("/courseDetails", async (req, res) => {
  if (req.query != null && req.query.course_id != null && req.query) {
    await db.getCourseDetailsById(req.query.course_id).then((data) => {
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

teacherRouter.post("/add-course", async (req, res) => {
  if (req.body != null && req.body.number != null && req.body.dept != null && req.body.prof_id != null) {
    const courseAlreadyExists = await db.getCourseByInfo(req.body.number, req.body.dept, req.body.prof_id)
    if (!courseAlreadyExists) {
      await db.addCourse(req.body.number, req.body.dept, req.body.prof_id)
        .then(data => {
          if (data == null) {
            res.status(400).json({ message: "Could not add new course" })
          } else {
            res.status(200).json(data)
          }
        })
    } else {
      return res.status(400).json({ message: "Course already exists" })
    }
  } else {
    return res.status(400).json({ message: "Unsufficient information for adding course" })
  }
})

//route to register a new teacher user
teacherRouter.post("/register", async (req, res) => {
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
        .json({ message: "Invalid Teacher ID. Needs to be 8 digits" });
    } else if (!isPasswordValid) {
      res.status(400).json({
        message:
          "Invalid password. Must be 8 characters long with lowercase, uppercase and special",
      });
    } else {
      const userAlreadyExists = await db.getUser(req.body.user_id)
      if (!userAlreadyExists) {
        await db.addUser(req.body.fname, req.body.lname, "teacher", req.body.user_id, req.body.pw)
          .then(data => {
            if (data == null) {
              res.status(400).json({ message: "Could not register new user" })
            } else {
              res.status(200).json(req.body)
            }
          })
      } else {
        return res.status(400).json({ message: "User already exists" })
      }
    }
  } else {
    return res.status(400).json({ message: "Unsufficient information for registration" })
  }
})

//route to create a new course in the db
teacherRouter.post("/create-courses", async (req, res) => {
  const { courseId, number, dept, user_id} = req.body; //Extract all the values from req.body

  if (courseId && number && dept && user_id) { // Check if all required fields are present
    const isNumberValid = validateNumber(number); 
    const isDepartmentValid = validateDepartment(dept);
    const isCourseIdValid = validateCourseId(courseId);
    const isUserValid = validateId(user_id);
    
    if (!isNumberValid) { 
      res.status(400).json({ message: "Invalid Number. Must be between 3 and 4 digits." })
    } else if (!isDepartmentValid) {
      res.status(400).json({ message: "Invalid Department. Must be between 2 and 20 characters." })
    } else if (!isCourseIdValid) {
      res.status(400).json({ message: "Invalid Course ID. Must be between 2 and 20 characters." })
    } else if (!isUserValid) {
      res.status(400).json({ message: "Invalid User ID." })
    } else {
      try {
        const data = await db.addCourse(courseId, number, dept, user_id, null, null);
        if (!data) {
          res.status(400).json({ message: "Could not register new course" });
        } else {
          res.status(200).json(req.body);
        }
      } catch (error) {
        res.status(500).json({ message: "Server error", error });
      }
    }
  } else {
    res.status(400).json({ message: "Missing required fields" });
  }
});


teacherRouter.use(function (_, res) {
  res.status(404).send("NOT FOUND");
});

export default teacherRouter;
