import mongoose, { Schema } from "mongoose";

const sectionSchema = new Schema(
    {
        students: [String],
        course: String,
        name: String
    },
    { collections:"Sections", queryString:true }
);

const Section = mongoose.model("Section", sectionSchema);
export default Section;