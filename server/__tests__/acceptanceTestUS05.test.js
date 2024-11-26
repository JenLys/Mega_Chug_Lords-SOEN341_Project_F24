// Student reviewing teammates tests
import { Db } from "../db/connection.js";
import Review from "../db/schemas/review.js";

let db;
let contextTeacher;
let contextStudent1;
let contextStudent2;
let contextCourse;
let contextGroup;

// Sets up a separate DB context for testing
async function setupDbContext() {
    contextTeacher = await db.addUser("CT", "Teacher", "teacher", "0099", "ctpass");
    contextStudent1 = await db.addUser("CT", "Student1", "student", "0001", "cspass");
    contextStudent2 = await db.addUser("CT", "Student2", "student", "0002", "cspass");
    
    let students = [contextStudent1.user_id, contextStudent2.user_id];
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

    // test('db returns a non-null group object', async () => {
    //     const group = await db.getGroupWithCourseAndMember(contextCourse._id, contextStudent1._id);
    //     expect(group).toBeTruthy();
    // });

    // test('db returns the correct group object', async () => {
    //     const group = await db.getGroupWithCourseAndMember();
    //     expect(group._id).toEqual(groupId);
    // });

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
        const newReview = await db.addReviewToGroup(contextCourse._id, contextGroup._id, contextStudent1._id, contextStudent2._id, reviewData);
        const deletedReview = await Review.findOneAndDelete({ _id: newReview.review._id });

        expect(deletedReview).toBeDefined();
        // expect(deletedReview).toHaveProperty("_id", newReview._id);
        // expect(deletedReview).toHaveProperty("_id", newReview._id);
    });
});