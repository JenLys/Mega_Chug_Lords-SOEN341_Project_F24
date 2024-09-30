import express from "express";
import teacherRegistration from "./teacherRegistration.js";
import teacherLogin from "./teacherLogin.js";
import { ObjectId } from "mongodb";
import db from "../db/connection.js";
import User from "../db/schemas/user.js";

import studentLogin from "./studentLogin.js"

const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({extended:true}));


router.get("/hello", (_, res) => {
  res.json({ hello: "world" });
});

router.get("/login/student", (req, res) => {
  console.log("Student login page");
  res.end();
})

//http://localhost:5050/api/register/teacher
router.use("/register/teacher", teacherRegistration);

//http://localhost:5050/api/login/teacher
router.use("/login/teacher", teacherLogin);

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
