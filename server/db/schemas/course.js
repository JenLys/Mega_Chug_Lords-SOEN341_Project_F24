import mongoose, { Schema } from "mongoose";

const courseSchema = new Schema(
  {
    number: String,
    dept: String,
    prof_id: String,
    student_ids: [String],
    group_ids: [String],
  },
  { collections: "Courses", queryString: true, strict: true }
);

const Course = mongoose.model("Course", courseSchema);
export default Course;
