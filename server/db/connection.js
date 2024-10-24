import mongoose from "mongoose";
import User from "../db/schemas/user.js";
import Course from "../db/schemas/course.js";

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

  async addCourse(
    courseId,
    number,
    dept,
    profId,
    students = None,
    groups = None
  ) {
    const course = await Course.create({
      course_id: courseId,
      number: number,
      dept: dept,
      prof_id: profId,
      students: students,
      groups: groups,
    });
    return course;
  }

  async addUserToCourse(userId, name, courseId) {
    const course = await Course.findOne({
      name: name,
      course_id: courseId,
    });
    course.student_ids.push(userId);
    await course.save();
  }

  async addUserToCourseGroup(userId, courseId, teamateIds) {
    const course = await getCourse(courseId);
    group = course.groups.find((group) =>
      teamateIds.every((id) => group.includes(id))
    );
    group.push(userId);
    await course.save();
  }

  async addGroupToCourse(courseId, students = None) {
    if (students == None) {
      students = [];
    }
    const course = await getCourse(courseId);
    course.groups.push(students);
    await course.save();
  }

  async getUserLogin(userId, pw) {
    return await User.findOne({ user_id: userId, pw: pw });
  }

  async getUser(id) {
    return await User.findOne({ user_id: id });
  }

  async getCourse(id) {
    return await Course.findOne({ course_id: id });
  }

  async removeUserFromCourse(userId, name, courseId) {
    const course = await Course.findOne({
      name: name,
      course_id: courseId,
    });
    course.student_ids = course.student_ids.filter((id) => id !== userId);
    await course.save();
  }

  async removeUser(id) {
    await User.deleteOne({ user_id: id });
  }

  async removeCourse(id) {
    await Course.deleteOne({ course_id: id });
  }
}

export default new Db();
