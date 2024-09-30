import mongoose from "mongoose";
import User from "../db/schemas/user.js";
import Course from "../db/schemas/course.js";
import Section from "../db/schemas/section.js";

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
  async addUser(fname, lname, role, id, pw) {
    const user = await User.create({
      fname: fname,
      lname: lname,
      role: role,
      user_id: id,
      pw: pw,
    });
    return user;
  }

  async addCourse(id, number, dept, profId) {
    const course = await Course.create({
      course_id: id,
      number: number,
      dept: dept,
      prof_id: profId,
    });
  }

  async addSection(studentIds, courseId, name) {
    const section = await Section.create({
      student_ids: studentIds,
      course_id: courseId,
      name: name,
    });
    return section;
  }

  async getUser(id) {
    const user = await User.findOne({ user_id: id });
    return user;
  }

  async getCourse(id) {
    const course = await Course.findOne({ course_id: id });
    return course;
  }

  async getSection(name, id) {
    const section = await Section.findOne({
      name: name,
      course_id: id,
    });
    return section;
  }

  async addUserToSection(id, name, courseId) {
    const section = await Section.findOne({
      name: name,
      course_id: courseId,
    });
    section.student_ids.push(id);
    await section.save();
  }

  async removeUser(id) {
    await User.deleteOne({ user_id: id });
  }

  async removeCourse(id) {
    await Course.deleteOne({ course_id: id });
  }

  async removeSection(name) {
    await Section.deleteOne({ name: name });
  }
}

export default new Db();
