import { Db } from "../db/connection.js";

let db, contextTeacher, contextStudent1, contextCourse, contextGroup, studentsList;

// Sets up a separate DB context for testing
async function setupDbContext() {
    contextTeacher = await db.addUser("CT", "Teacher", "teacher", "0099", "ctpass");
    contextStudent1 = await db.addUser("CT", "Student1", "student", "0001", "cspass");
    
    // Course initially has no students
    contextCourse = await db.addCourse("999", "COMP", contextTeacher._id);
    contextGroup = await db.addGroupToCourse(contextCourse._id, studentsList);
}

// Delete all the context objects from the DB to avoid clutter
async function deleteDbContext() {
    await db.deleteUserById(contextTeacher._id);
    await db.deleteUserById(contextStudent1._id);
    await db.deleteCourseById(contextCourse._id);
    await db.deleteGroupById(contextGroup._id);
}

describe("Student adding themselves to courses tests", () => {
    // We only want to open the DB connection and create the context objects once
    beforeAll( async () => {
        // 'true' opens connection to test db instead of main db; see connection.js
        db = new Db(true);  
        await setupDbContext();
        return db;
    });

    // After tests are done we close the connection and tear down the context
    afterAll( async () => {
        try {
            await deleteDbContext();
            await db.disconnectDb();
        } catch (error) {
            console.error(error);
        }
    });

    test('addUserToCourse db function inserts new db object', async () => {
        const course = await db.addUserToCourse(contextStudent1.user_id, contextCourse._id);
        const studentIdsList = course.student_ids;
        
        expect(course).toBeDefined();
        expect(course).toHaveProperty("_id", contextCourse._id);
        expect(studentIdsList).toContain(contextStudent1.user_id);
    });
});