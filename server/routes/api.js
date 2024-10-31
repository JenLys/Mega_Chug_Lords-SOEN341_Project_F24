import express from "express";
import studentRouter from "./studentRouter.js";
import teacherRouter from "./teacherRouter.js";

const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.use("/student", studentRouter)
router.use("/teacher", teacherRouter)

export default router;