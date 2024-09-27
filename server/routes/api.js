import express from "express";
import db from "../db/connection.js"

const router = express.Router();
router.get("/hello", (_, res) => {
  res.json({ "hello": "world" })
})

export default router;