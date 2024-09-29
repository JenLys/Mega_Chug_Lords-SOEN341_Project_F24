import mongoose, { Schema } from "mongoose";

const courseSchema = new Schema(
    {
        course_id: String,
        number: String,
        dept: String,
        pro_id: String,
    },
    { collections:"Courses", queryString:true }
);

const Course = mongoose.model("Course", courseSchema);
export default Course;