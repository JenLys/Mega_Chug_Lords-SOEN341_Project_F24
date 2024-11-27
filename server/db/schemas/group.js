import mongoose, { Schema } from "mongoose";

const groupSchema = new Schema(
  {
    name: String,
    course_id: String,
    student_ids: [String],
    review_ids: [String],
  },
  { collections: "Groups", queryString: true, strict: true }
);

const Group = mongoose.model("Group", groupSchema);
export default Group;
