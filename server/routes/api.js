import express from "express";
import db from "../db/connection.js";
import User from "../schemas/user-schema.js";

const router = express.Router();
router.use(express.json());
router.use(urlencoded());

router.get("/hello", (_, res) => {
  res.json({ hello: "world" });
});

router.get("/login/student", (req, res) => {
  console.log("Student login page");
  res.end();
})

router.post("/login/student", (req, res) => {
  const id = req.body.id || "";
  const pw = req.body.pw || "";
  console.log(userData);
  
  // Redirect to login page with a successful signup popup message
  return(res.redirect("/login")); 
})

export default router;
