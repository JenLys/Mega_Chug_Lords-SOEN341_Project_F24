import mongoose from "mongoose";
import User from "../db/schemas/user.js";
import Course from "../db/schemas/course.js";
import Group from "../db/schemas/group.js";
import Review from "../db/schemas/review.js";

const uri = process.env.ATLAS_URI || "";
const dbName = process.env.DB_NAME || "reviewmate";

// Exit if no URI is provided
if (uri.length === 0) {
  process.exit(-1);
}

export class Db {
  constructor(isTest = false) {
    this.isTest = isTest;
    (async () => {
      await this.connectDb();
    })()
  }

  /**
   * Connect to the MongoDB database
   * Reads ATLAS_URI and DB_NAME environment variable
   */
  async connectDb() {
    let dbOptions = {
      dbName: "" + (this.isTest ? `${dbName}-test` : dbName),
    };
    await mongoose.connect(uri, dbOptions)
      .then(console.log("Connected to MongoDB"))
      .catch(() => {throw new Error("Connection to DB failed")})
  }

  async disconnectDb() {
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

  async deleteUserById(id) {
    await User.findOneAndDelete({ '_id': id });
  }
  async deleteCourseById(id) {
    await Course.findOneAndDelete({ '_id': id });
  }
  async deleteGroupById(id) {
    await Group.findOneAndDelete({ '_id': id });
  }
  async deleteReviewById(id) {
    return await Review.findOneAndDelete({ '_id': id });
  }

  async addCourse(number, dept, profId, students = [], groups = []) {
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
    const course = await this.getCourseById(courseId);

    const group = await Group.create({
      name: `Group #${course.group_ids.length + 1}`, // groups are just numbered incrementally
      course_id: courseId,
      student_ids: students,
      review_ids: [],
    });
    course.group_ids.push(group._id);
    await course.save();
    return group;
  }

  async addReviewToGroup(
    courseId,
    groupId,
    reviewerId,
    revieweeId,
    reviewData
  ) {
    const review = await Review.create({
      reviewer_id: reviewerId,
      reviewee_id: revieweeId,
      course_id: courseId,
      cooperation: reviewData.cooperation,
      conceptual: reviewData.conceptual,
      practical: reviewData.practical,
      work_ethic: reviewData.work_ethic,
      cooperation_comment: reviewData.cooperation_comment,
      conceptual_comment: reviewData.conceptual_comment,
      practical_comment: reviewData.practical_comment,
      work_ethic_comment: reviewData.work_ethic_comment,
    });
    const group = await this.getGroup(groupId);
    group.review_ids.push(review._id);
    const savedGroup = await group.save();
    return {
      group: savedGroup,
      review: review,
    }
  }

  async addUserToCourse(userId, courseId) {
    const course = await Course.findOne({
      _id: courseId,
    });

    if (!course.student_ids.includes(userId)) {
      course.student_ids.push(userId);
      return await course.save();
    }
    return null;
  }

  async addUserToCourseGroup(groupId, userId) {
    const group = await this.getGroup(groupId);
    group.student_ids.push(userId);
    await group.save();
  }

  // Returns all courses that a teacher is teaching
  async getTeacherCourses(userId) {
    const isTeacher = await this.getTeacher(userId);
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

  async getIsInTeam(userId, courseId) {
    const course = await this.getCourseById(courseId);
    if (course.group_ids.length == 0) {
      return false;
    }
    const res = course.group_ids.map(async (groupId) => {
      const group = await this.getGroup(groupId);
      return group.student_ids.includes(userId);
    });
    return (await Promise.all(res)).includes(true);
  }

  async getGroupsInfo(course_id) {
    const groups = await Group.find({ course_id: course_id });
    const groupDetails = await Promise.all(
      groups.map(async (group) => {
        const students = await User.find(
          {
            user_id: { $in: group.student_ids },
            role: "student",
          },
          { pw: 0 } // Exclude the password field
        );
        return { group, students };
      })
    );
    return groupDetails;
  }

  async getAllReviewsForStudent(userId) {
    const reviews = await Review.find({ reviewee_id: userId });
    return reviews;
  }

  async getBulkCourseDetailsTeacherOnlyByIds(courseIds) {
    const courses = courseIds.map(async (courseId) => {
      return this.getCourseDetailsWithTeacherOnlyById(courseId);
    });
    return await Promise.all(courses);
  }

  async getCourseDetailsWithTeacherOnlyById(courseId) {
    const course = await Course.findOne({ _id: courseId });
    if (course == null) {
      throw new Error("No course found");
    }
    const teacher = await User.findOne(
      {
        user_id: course.prof_id,
        role: "teacher",
      },
      { pw: 0 }
    );
    return {
      course: course,
      teacher: teacher,
    };
  }

  async getBulkCourseDetailsByIds(courseIds) {
    const courses = courseIds.map(async (courseId) => {
      return this.getCourseDetailsById(courseId);
    });
    return await Promise.all(courses);
  }

  async getCoursesStudentNotEnrolledIn(user_id) {
    const courses = await Course.find({ student_ids: { $nin: [user_id] } });
    const coursesWithTeachers = courses.map(async (course) => {
      const teacher = await this.getTeacher(course.prof_id);
      return {
        course: course,
        teacher: teacher,
      };
    });
    return Promise.all(coursesWithTeachers);
  }

  async getStudent(user_id) {
    return await User.findOne(
      {
        user_id: user_id,
        role: "student",
      },
      { pw: 0 }
    );
  }

  async getTeacher(user_id) {
    return await User.findOne(
      {
        user_id: user_id,
        role: "teacher",
      },
      { pw: 0 }
    );
  }

  async getCourseDetailsById(courseId) {
    const course = await Course.findOne({ _id: courseId });
    if (course == null) {
      throw new Error("No course found");
    }
    const groups = await Group.find({ course_id: courseId });
    const students = await User.find(
      {
        user_id: { $in: course.student_ids },
        role: "student",
      },
      { pw: 0 }
    );
    const teacher = await User.findOne(
      {
        user_id: course.prof_id,
        role: "teacher",
      },
      { pw: 0 }
    );
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

  async getCourseByInfo(number, dept, prof_id) {
    return await Course.findOne({
      number: number,
      dept: dept,
      prof_id: prof_id,
    });
  }

  async getGroupWithCourseAndMember(courseId, memberId) {
    return await Group.findOne({
      course_id: courseId,
      student_ids: { $in: memberId },
    });
  }

  async getCourseById(id) {
    return await Course.findOne({ _id: id });
  }

  async getGroup(id) {
    return await Group.findOne({ _id: id });
  }

  async getReview(id) {
    return await Review.findOne({ _id: id });
  }

  async removeUserFromCourse(userId, courseId) {
    const course = await Course.findOne({
      course_id: courseId,
    });
    course.student_ids = course.student_ids.filter((id) => id !== userId);
    await course.save();
    return true;
  }

  async getAllReviewsForAllCourseOfTeacher(teacherId) {
    const courses = await this.getTeacherCourses(teacherId);
    const reviews = courses.map(async (course) => {
      const studentReviews = await this.getAllReviewsForCourse(course._id);
      return {
        course: course,
        studentReviews: studentReviews,
      };
    });
    return await Promise.all(reviews);
  }

  async getAllReviewsForCourse(courseId) {
    const course = await Course.findOne({ _id: courseId });
    const allReviews = course.student_ids.map(async (student_id) => {
      const reviews = await Review.find({
        reviewee_id: student_id,
        course_id: courseId,
      });
      const student = await this.getStudent(student_id);
      return {
        student: student,
        reviews: reviews,
      };
    });
    return await Promise.all(allReviews);
  }
}

export const initDb = new Db();
