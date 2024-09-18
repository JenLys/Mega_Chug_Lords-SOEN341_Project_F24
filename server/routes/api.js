import express from "express";
// import db from "../db/connection.js"
import { ObjectId } from "mongodb";

const router = express.Router();
router.get("/hello", (_, res) => {
  res.json({ "hello": "world" })
})

export default router;