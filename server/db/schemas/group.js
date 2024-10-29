import mongoose, { Schema } from "mongoose";

const groupSchema = new Schema(
  {
    course_id: String,
    student_ids: [String],
    review_ids: [String],
    assignment_ids: [String],
  },
  { collections: "Groups", queryString: true }
);

const Group = mongoose.model("Group", groupSchema);
export default Group;
