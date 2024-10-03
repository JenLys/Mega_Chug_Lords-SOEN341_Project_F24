import express from "express";
import studentRouter from "./studentRouter.js";

const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.use("/student", studentRouter)
router.use("/teacher", studentRouter)

export default router;