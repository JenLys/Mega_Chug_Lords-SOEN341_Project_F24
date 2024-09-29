import mongoose from "mongoose";
import User from "../schemas/user.js";
import Course from "../schemas/course.js";
import Section from "../schemas/section.js";

const uri = process.env.ATLAS_URI || "";
const dbName = process.env.DB_NAME || "reviewmate";

if (uri.length === 0) {
  process.exit(-1);
}

class Db {
  constructor() {
    this.connectDb();
  }

  connectDb() {
    let dbOptions = {
      dbName: "" + dbName,
    };
    mongoose.connect(uri, dbOptions);
    console.log("Connected to MongoDB");
  }

  disconnectDb() {
    mongoose.connection.close();
  }

  async getAll(collectionSchema) {
    const collection = collectionSchema.find();
    return collection;
  }

  async addUser(userFname, userLname, userRole, userId, userPw) {
    const user = await User.create({
      fname: userFname,
      lname: userLname,
      role: userRole,
      user_id: userId,
      pw: userPw,
    });
    return user;
  }

  async addCourse(courseId, courseNumber, courseDept, courseProfId) {
    const course = await Course.create({
      course_id: courseId,
      number: courseNumber,
      dept: courseDept,
      prof_id: courseProfId,
    });
  }

  async addSection(sectionStudentIds, sectionCourseId, sectionName) {
    const section = await Section.create({
      student_ids: sectionStudentIds,
      course_id: sectionCourseId,
      name: sectionName,
    });
    return section;
  }
}

export default new Db();
