import express from "express";
import teacherRegistration from "./teacherRegistration.js";
import teacherLogin from "./teacherLogin.js";
import { ObjectId } from "mongodb";
import db from "../db/connection.js"

const router = express.Router();
router.get("/hello", (_, res) => {
  res.json({ "hello": "world" })
})

//http://localhost:5050/api/register/teacher
router.use("/register/teacher", teacherRegistration);

//http://localhost:5050/api/login/teacher
router.use("/login/teacher", teacherLogin);

export default router;