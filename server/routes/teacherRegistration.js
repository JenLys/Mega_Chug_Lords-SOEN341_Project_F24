import express, { json } from 'express';
import db from "../db/connection.js";
import User from "../schemas/user-schemas.js";
const teacherRouter = express.Router();
teacherRouter.use(express.json());
teacherRouter.use(express.urlencoded({extended: true})); 


async function validateId(user_id) {
    try {
      const user = await User.findOne({ user_id: user_id });
      return user ? false : true; 
    } catch (error) {
      console.error(error);
      return false; 
    }
  }

function validatePassword(pw){
    return /[A-Z]/       .test(pw) &&
           /[a-z]/       .test(pw) &&
           /[0-9]/       .test(pw) &&
           /[^A-Za-z0-9]/.test(pw) &&
           pw.length > 11;
}
teacherRouter.post("/teacher", async(req,res) => {
    if (req.body !=null && req.body.fname != null && req.body.lname != null && req.body.user_id != null && req.body.pw != null){
        const newUser = new User({
            fname: req.body.fname,
            lname: req.body.lname,
            role: "teacher",
            user_id: req.body.user_id,
            pw: req.body.pw
        });
            const pwValidated = await validatePassword(req.body.pw);
            const idValidated = await validateId(req.body.user_id);
            if  (pwValidated && idValidated) {
                await newUser.save()
                .then(() => res.status(200).send(newUser))
                .catch((error)=> res.status(500).send("DB upload failed"));
                    
            } else {
                if (!idValidated) {
                    res.status(400).send("This user ID is already in use by another account. Please choose a different one or log into your existing account.");
                }
                if (!pwValidated){
                    res.status(400).send("The password must be at least 6 characters long and include an uppercase letter, a lowercase letter, a number, and a special character.");                
                }
                else{
                    res.status(400).send("Invalid user ID or password.")
                }
            }
    } else {
        res.status(404).send("Registration information not provided.");
    }
});

export default teacherRouter;