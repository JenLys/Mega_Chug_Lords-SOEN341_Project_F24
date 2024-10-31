import mongoose, { Schema } from "mongoose";

const courseSchema = new Schema(
  {
    course_id: String,
    number: String,
    dept: String,
    prof_id: String,
  },
  { collections: "Courses", queryString: true }
);

// Static method to find courses by student_id
courseSchema.statics.findCoursesByStudentId = async function (student_id) {
  return this.find({ student_id }, "course_id number"); // Finds by student_id and projects course_id and number fields
};

const Course = mongoose.model("Course", courseSchema);
export default Course;
