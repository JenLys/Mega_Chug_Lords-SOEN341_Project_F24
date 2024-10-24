import mongoose, { Schema } from "mongoose";

const courseSchema = new Schema(
  {
    course_id: String,
    number: String,
    dept: String,
    prof_id: String,
    student_ids: [String],
    groups: [Array],
  },
  { collections: "Courses", queryString: true }
);

const Course = mongoose.model("Course", courseSchema);
export default Course;
