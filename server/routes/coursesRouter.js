import express from "express";
import { initDb as db } from "../db/connection.js";

const coursesRouter = express.Router({ mergeParams: true });

coursesRouter.post("/courses-details", async (req, res) => {
  if (req.body && req.body.courseIds != null) {
    try {
      const result = await db.getBulkCourseDetailsByIds(req.body.courseIds)
      res.status(200).json(result)
    } catch (err) {
      console.log(err);
      res.status(400).json([])
    }
  } else {
    res.status(400).json([])
  }
})

coursesRouter.post("/courses-details-with-teacher-only", async (req, res) => {
  if (req.body && req.body.courseIds != null) {
    try {
      const result = await db.getBulkCourseDetailsTeacherOnlyByIds(req.body.courseIds)
      res.status(200).json(result)
    } catch (err) {
      console.log(err);
      res.status(400).json([])
    }
  } else {
    res.status(400).json([])
  }
})

coursesRouter.get("/all-courses", async (req, res) => {
  await db.getAll(Course).then((data) => {
    res.status(200).json(data);
  });
});

coursesRouter.post("/create-group", async (req, res) => {
  return 1;
})

export default coursesRouter;