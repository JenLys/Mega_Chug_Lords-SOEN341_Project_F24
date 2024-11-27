import { Db } from "../db/connection.js";
// import { setupDbContext, deleteDbContext } from "./dbTestSetup.js";

let db, contextTeacher, contextStudent1, contextCourse, contextGroup;

// Sets up a separate DB context for testing
async function setupDbContext() {
    contextTeacher = await db.addUser("CT", "Teacher", "teacher", "0099", "ctpass");
    contextStudent1 = await db.addUser("CT", "Student1", "student", "0001", "cspass");
    contextStudent2 = await db.addUser("CT", "Student2", "student", "0002", "cspass");
    contextCourse = await db.addCourse("999", "COMP", contextTeacher._id);
    contextGroup = await db.addGroupToCourse(contextCourse._id);
}

// Delete all the context objects from the DB to avoid clutter
async function deleteDbContext() {
    await db.deleteUserById(contextTeacher._id);
    await db.deleteUserById(contextStudent1._id);
    await db.deleteCourseById(contextCourse._id);
    await db.deleteGroupById(contextGroup._id);
}

describe("Creating course and viewing participants as a teacher tests", () => {
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

    test('getCourseByInfo db function returns the correct course', async () => {
        const course = await db.getCourseByInfo(contextCourse.number, contextCourse.dept, contextCourse.prof_id);
        expect(course).toBeDefined();
        expect(course).toHaveProperty("_id", contextCourse._id);
    });

    test('addCourse db function correctly inserts the db object', async () => {
        const course = await db.addCourse("8787", "ELA", "2");
        const deletedCourse = await db.deleteCourseById(course._id);
        
        expect(deletedCourse).not.toBeNull();
        expect(deletedCourse).toHaveProperty("_id", course._id);
        expect(deletedCourse).toHaveProperty("number", "8787");
        expect(deletedCourse).toHaveProperty("dept", "ELA");
        expect(deletedCourse).toHaveProperty("prof_id", "2");
    });
});