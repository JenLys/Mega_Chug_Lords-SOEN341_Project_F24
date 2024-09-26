import mongoose, { Schema } from "mongoose";
import User from "./user-schema";

const courseSchema = new Schema(
    {
        course_id: String,
        number: String,
        dept: String,
        prof: User.schema,
    }
);

const Course = mongoose.model("Course", courseSchema);
export default Course;