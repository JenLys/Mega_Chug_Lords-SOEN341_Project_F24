import mongoose, { Schema } from "mongoose";

const sectionSchema = new Schema(
    {
        student_ids: [String],
        course_id: String,
        course_name: String
    },
    { collections:"Sections", queryString:true }
);

const Section = mongoose.model("Section", sectionSchema);
export default Section;