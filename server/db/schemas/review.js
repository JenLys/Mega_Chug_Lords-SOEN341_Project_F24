import mongoose, { Schema } from "mongoose";

const reviewSchema = new Schema(
  {
    reviewer_id: String,
    reviewee_id: String,
    course_id: String,
    cooperation: Number,
    conceptual: Number,
    practical: Number,
    work_ethic: Number,
    cooperation_comment: String,
    conceptual_comment: String,
    practical_comment: String,
    work_ethic_comment: String,
  },
  { collections: "Reviews", queryString: true, strict: true }
);

const Review = mongoose.model("Review", reviewSchema);
export default Review;
