import mongoose, { Schema } from "mongoose";

const assignmentSchema = new Schema(
  {
    content: String,
    student_id: String,
  },
  { collections: "Assignments", queryString: true }
);

const Assignment = mongoose.model("Assignment", assignmentSchema);
export default Assignment;
