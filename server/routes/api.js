import express from "express";
import db from "../db/connection.js";
import User from "../schemas/user-schema.js";

const router = express.Router();
router.get("/hello", (_, res) => {
  res.json({ hello: "world" });
});

console.log(await db.getAll(User));
export default router;
