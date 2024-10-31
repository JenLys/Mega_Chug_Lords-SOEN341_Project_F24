import mongoose from "mongoose";
import User from "../db/schemas/user.js";
import Course from "../db/schemas/course.js";
import Group from "../db/schemas/group.js";
import Review from "../db/schemas/review.js";
import Assignment from "../db/schemas/assignment.js";

const uri = process.env.ATLAS_URI || "";
const dbName = process.env.DB_NAME || "reviewmate";

// Exit if no URI is provided
if (uri.length === 0) {
  process.exit(-1);
}

export class Db {
  constructor(isTest = false) {
    this.isTest = isTest;
    this.connectDb();
  }

  /**
   * Connect to the MongoDB database
   * Reads ATLAS_URI and DB_NAME environment variable
   */
  connectDb() {
    let dbOptions = {
      dbName: "" + (this.isTest ? `${dbName}-test` : dbName),
    };
    mongoose.connect(uri, dbOptions);
    console.log("Connected to MongoDB");
  }

  disconnectDb() {
    mongoose.connection.close();
  }

  /**
   *  Generic method that returns all items in a collection given the schema
   * @param {*} Schema
   * @returns Collection of a Schema
   */
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

  async addCourse(number, dept, profId, students = None, groups = None) {
    const course = await Course.create({
      number: number,
      dept: dept,
      prof_id: profId,
      students: students,
      groups: groups,
    });
    return course;
  }

  async addGroupToCourse(courseId, students = null) {
    if (students == null) {
      students = [];
    }
    const course = await this.getCourse(courseId);
    const group = await Group.create({
      course_id: courseId,
      student_ids: students,
      review_ids: [],
      assignment_ids: [],
    });
    course.group_ids.push(group._id);
    await course.save();
    return group;
  }

  async addReviewToGroup(groupId, reviewerId, assignmentId, rating) {
    const review = await Review.create({
      reviewer_id: reviewerId,
      assignment_id: assignmentId,
      rating: rating,
    });
    const group = await this.getGroup(groupId);
    group.review_ids.push(review._id);
    group.save();
  }

  async addAssignmentToGroup(groupId, content, studentId) {
    const assignment = await Assignment.create({
      content: content,
      student_id: studentId,
    });
    const group = await this.getGroup(groupId);
    group.assignment_ids.push(assignment._id);
    group.save();
    return assignment;
  }

  async addUserToCourse(userId, courseId) {
    const course = await Course.findOne({
      _id: courseId,
    });
    course.student_ids.push(userId);
    await course.save();
  }

  async addUserToCourseGroup(userId, groupId) {
    const group = await this.getGroup(groupId);
    group.student_ids.push(userId);
    await group.save();
  }

  // Returns all courses that a teacher is teaching
  async getTeacherCourses(userId) {
    const isTeacher = await User.findOne({ user_id: userId, role: "teacher" });
    if (isTeacher == null) {
      throw new Error("User is not a teacher");
    }
    return await Course.find({ prof_id: userId });
  }

  // Returns all courses that a student is enrolled in
  async getStudentCourses(userId) {
    const isStudent = await User.findOne({ user_id: userId, role: "student" });
    if (isStudent == null) {
      throw new Error("User is not a student");
    }

    return await Course.find({ student_ids: { $in: userId } });
  }

  async getCourseDetails(courseId) {
    const isCourse = await Course.findOne({ _id: courseId });
    if (isCourse == null) {
      throw new Error("Course not found");
    }
    const course = await Course.findOne({ _id: courseId });
    const groups = await Group.find({ course_id: courseId });
    const students = await User.find({
      user_id: { $in: course.student_ids },
      role: "student",
    });
    const teacher = await User.findOne({
      user_id: course.prof_id,
      role: "teacher",
    });
    return {
      course: course,
      groups: groups,
      students: students,
      teacher: teacher,
    };
  }

  async loginUser(userId, pw, role) {
    return await User.findOne({ user_id: userId, pw: pw, role: role });
  }

  async getUser(id) {
    return await User.findOne({ user_id: id });
  }

  async getCourse(id) {
    return await Course.findOne({ _id: id });
  }

  async getGroup(id) {
    return await Group.findOne({ _id: id });
  }

  async getReview(id) {
    return await Review.findOne({ _id: id });
  }

  async getAssignment(id) {
    return await Assignment.findOne({ _id: id });
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

export const initDb = new Db();