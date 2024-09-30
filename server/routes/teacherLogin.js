import express, { json } from 'express';
const teacherRouter = express.Router();
import db from "../db/connection.js";
teacherRouter.use(express.json());
teacherRouter.use(express.urlencoded({extended: true})); 


teacherRouter.post("/", async(req,res) => {
    const dbUser = await db.getUser(req.body.user_id);
    if (!dbUser)
    {
        console.log("User not found.")
        res.sendStatus(404);
    } 
    else
    {
      if (req.body.pw !== dbUser.pw)
      {
        console.log("Incorrect password.")
        res.sendStatus(401);
      } 
      else
      {
        console.log("Login successful.");
        res.sendStatus(200); 
      }
    }
});

export default teacherRouter;