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

  // CRUD Functions
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

  async getUser(userId) {
    const user = await User.findOne({ user_id: userId });
    return user;
  }

  async getCourse(courseId) {
    const course = await Course.findOne({ course_id: courseId });
    return course;
  }

  async getSection(sectionName, courseId) {
    const section = await Section.findOne({
      name: sectionName,
      course_id: courseId,
    });
    return section;
  }

  async addUserToSection(courseId, sectionName, userId) {
    const section = await Section.findOne({
      name: sectionName,
      course_id: courseId,
    });
    section.student_ids.push(userId);
    await section.save();
  }

  async removeUser(userId) {
    await User.deleteOne({ user_id: userId });
  }

  async removeCourse(courseId) {
    await Course.deleteOne({ course_id: courseId });
  }

  async removeSection(sectionName) {
    await Section.deleteOne({ name: sectionName });
  }
}

export default new Db();
