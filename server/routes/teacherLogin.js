import express, { json } from 'express';
const teacherRouter = express.Router();
import db from "../db/connection.js";
teacherRouter.use(express.json());
teacherRouter.use(express.urlencoded({extended: true})); 


teacherRouter.post("/", async(req,res) => {
    const dbUser = await db.getUser(req.body.user_id);
    if (!dbUser)
    {
        res.status(404).send("User not found.");
    } 
    else
    {
      if (req.body.pw !== dbUser.pw)
      {
        res.status(401).send("Incorrect password.");
      } 
      else
      {
        res.status(200).send("Login successful."); 
      }
    }
});

export default teacherRouter;