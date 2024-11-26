// Student reviewing teammates tests
import { Db } from "../db/connection.js";
import Review from "../db/schemas/review.js";

let db;
let contextTeacher;
let contextStudent1;
let contextStudent2;
let contextCourse;
let contextGroup;
let students

// Sets up a separate DB context for testing
async function setupDbContext() {
    contextTeacher = await db.addUser("CT", "Teacher", "teacher", "0099", "ctpass");
    contextStudent1 = await db.addUser("CT", "Student1", "student", "0001", "cspass");
    contextStudent2 = await db.addUser("CT", "Student2", "student", "0002", "cspass");
    
    students = [contextStudent1.user_id, contextStudent2.user_id];
    contextCourse = await db.addCourse("999", "COMP", contextTeacher._id, students);
    contextGroup = await db.addGroupToCourse(contextCourse._id, students);
}

async function deleteDbContext() {
    await db.deleteUserById(contextTeacher._id);
    await db.deleteUserById(contextStudent1._id);
    await db.deleteUserById(contextStudent2._id);
    await db.deleteCourseById(contextCourse._id);
    await db.deleteGroupById(contextGroup._id);
}

describe("Student reviews tests", () => {
    // We only want to open the DB connection once
    beforeAll( async () => {
        // 'true' opens connection to test db instead of main db; see connection.js
        db = new Db(true);  
        await setupDbContext(db);
        return db;
    });
    afterAll( async () => {
        try {
            await deleteDbContext(db);
            await db.disconnectDb();
        } catch (error) {
            console.error(error);
        }
    });

    test('db returns a non-null group object', async () => {
        const group = await db.getGroupWithCourseAndMember(contextCourse._id, contextStudent1.user_id);
        expect(group).not.toBeNull();
    });

    test('db returns correct group object', async () => {
        const group = await db.getGroupWithCourseAndMember(contextCourse._id, contextStudent1.user_id);
        expect(group).toHaveProperty("course_id", contextCourse._id.toString());
        expect(group).toHaveProperty("student_ids", students);
    });


    test('submitting a review inserts a new db object with the right information', async () => {
        let reviewData = {
            cooperation: 10,
            conceptual: 9,
            practical: 8,
            work_ethic: 7,
            cooperation_comment: "10",
            conceptual_comment: "9",
            practical_comment: "8",
            work_ethic_comment: "7",
        }
        const newReview = await db.addReviewToGroup(contextCourse._id, contextGroup._id, contextStudent1.user_id, contextStudent2.user_id, reviewData);
        const newReviewId = newReview.review._id;
        const deletedReview = await db.deleteReviewById(newReviewId);
        
        expect(deletedReview).toBeDefined();
        expect(deletedReview).toHaveProperty("course_id", contextCourse._id.toString());
        expect(deletedReview).toHaveProperty("cooperation", 10);
        expect(deletedReview).toHaveProperty("practical_comment", '8');
    });
});