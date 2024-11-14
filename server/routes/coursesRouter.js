import express from "express";
import { initDb as db } from "../db/connection.js";

const coursesRouter = express.Router({ mergeParams: true });

coursesRouter.post("/courses-details", async (req, res) => {
  if (req.body && req.body.courseIds != null) {
    try {
      const result = await db.getBulkCourseDetailsByIds(req.body.courseIds);
      res.status(200).json(result);
    } catch (err) {
      console.log(err);
      res.status(400).json([]);
    }
  } else {
    res.status(400).json([]);
  }
});

coursesRouter.post("/courses-details-with-teacher-only", async (req, res) => {
  if (req.body && req.body.courseIds != null) {
    try {
      const result = await db.getBulkCourseDetailsTeacherOnlyByIds(
        req.body.courseIds
      );
      res.status(200).json(result);
    } catch (err) {
      console.log(err);
      res.status(400).json([]);
    }
  } else {
    res.status(400).json([]);
  }
});

coursesRouter.post("/add-review", async (req, res) => {
  if (
    req.body &&
    req.body.group_id != null &&
    req.body.reviewer_id != null &&
    req.body.reviewee_id != null &&
    req.body.review != null
  ) {
    try {
      const result = await db.addReviewToGroup(
        req.body.group_id,
        req.body.reviewer_id,
        req.body.reviewee_id,
        req.body.review
      );
      res.status(200).json(result);
    } catch (err) {
      console.log(err);
      res.status(400).json("error adding review");
    }
  } else {
    res.status(400).json("error in body");
  }
});

coursesRouter.post("/add-to-group", async (req, res) => {
  if (req.body && req.body.group_id != null && req.body.user_id != null) {
    try {
      const result = await db.addUserToCourseGroup(
        req.body.group_id,
        req.body.user_id
      );

      res.status(200).json(result);
    } catch (err) {
      console.log(err);
      res.status(400).json("error adding user to group");
    }
  } else {
    res.status(400).json("error in body");
  }
});

coursesRouter.get("/all-courses", async (req, res) => {
  await db.getAll(Course).then((data) => {
    res.status(200).json(data);
  });
});

// Currently only creates empty groups; does not initialize students array
coursesRouter.post("/create-group", async (req, res) => {
  if (req.body && req.body.course_id != null) {
    try {
      const result = await db.addGroupToCourse(req.body.course_id);
      res.status(200).json(result);
    } catch (err) {
      console.log(err);
      res.status(400).json([]);
    }
  } else {
    res.status(400).json([]);
  }
});

export default coursesRouter;
