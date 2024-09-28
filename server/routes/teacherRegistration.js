import express, { json } from 'express';
import db from "../db/connection.js";
import User from "../db/schemas.js";

const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({extended: true})); 


async function validateId(user_id) {
    try {
      const user = await User.findById(user_id);
      return user ? false : true; 
    } catch (error) {
      console.error(error);
      return false; 
    }
  }

function validatePassword(pw){
    return true;
}

router.post("/teacher", async(req,res) => {
    if (req.body != null){
        const newUser = new User({
            fname: req.body.fname,
            lname: req.body.lname,
            role: "Teacher",
            user_id: req.body.user_id,
            pw: req.body.pw
        });
        try {
            // Validate the input
            if (validatePassword(req.body.password) && validateId(req.body.user_id)) {
                // Save the user to the database
                await newUser.save();
                res.status(200).send(newUser);
            } else {
                res.status(400).send("Invalid user ID or password");
            }
        } catch (error) {
            console.error('Error saving user:', error);
            res.status(500).send("DB upload failed");
        }
    } else {
        res.status(404).send("Registration information not provided.");
    }
});

export default router;