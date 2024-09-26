import mongoose, { Schema } from "mongoose";
import Course from "./course-schema";
import User from "./user-schema";

const sectionSchema = new Schema(
    {
        students: [User.schema],
        course: Course.schema,
        name: String
    }
);

const Section = mongoose.model("Section", sectionSchema);
export default Section;