import express from "express";
import teacher from "./teacherRegistration.js";
// import db from "../db/connection.js"
import { ObjectId } from "mongodb";

const router = express.Router();
router.get("/hello", (_, res) => {
  res.json({ "hello": "world" })
})

//http://localhost:5050/api/register/teacher
router.use("/register", teacher);

export default router;