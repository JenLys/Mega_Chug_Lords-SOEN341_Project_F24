import db from "../../db/connection.js";

async function studentLogin(req, res) {
    const dbUser = await db.getUser(req.body.user_id);

    if (!dbUser) // dbUser is null, does not exist in db
    {
        console.log("User not found.")
        res.sendStatus(404);
    } 
    
    else
    {
      if (req.body.pw !== dbUser.pw) // Passwords do not match
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
    // Redirect to login page with a successful signup popup message
}