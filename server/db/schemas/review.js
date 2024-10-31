import mongoose, { Schema } from "mongoose";

const reviewSchema = new Schema(
  {
    reviewer_id: String,
    assignment_id: String,
    rating: Number,
  },
  { collections: "Reviews", queryString: true, strict: true }

);

const Review = mongoose.model("Review", reviewSchema);
export default Review;
