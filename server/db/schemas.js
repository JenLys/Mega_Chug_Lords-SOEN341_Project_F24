import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
    {
        fname: String,
        lname: String,
        role: String,
        user_id: String,
        pw: String
    },
    {
        collection:"users", strictQuery:true
    }
);

const User = mongoose.model("User", userSchema);
export default User;