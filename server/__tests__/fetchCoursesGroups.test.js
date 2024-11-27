import { Db } from "../db/connection.js";
import { ObjectId } from "mongodb";
// import { setupDbContext, deleteDbContext } from "./dbTestSetup.js";

let db;
const teacherId = "87654321";

describe("Creating course and viewing participants as a teacher tests", () => {
    // We only want to open the DB connection and create the context objects once
    beforeAll( async () => {
        // 'true' opens connection to test db instead of main db; see connection.js
        db = new Db(true);  
        return db;
    });

    // After tests are done we close the connection and tear down the context
    afterAll( async () => {
        try {
            await db.disconnectDb();
        } catch (error) {
            console.error(error);
        }
    });

    test('getTeacherCourses returns the correct courses', async () => {
        const courses = await db.getTeacherCourses(teacherId);
        let teacherIsInAllCourses = true;

        for (let i = 0; i < courses.length; i++) {
            if (courses[i].prof_id != teacherId) {
                teacherIsInAllCourses = false;
            } else {
                continue
            }};
        
        expect(teacherIsInAllCourses).toBe(true);
    });

    test('getGroupsInfo returns the correct groups', async () => {
        const courses = await db.getTeacherCourses(teacherId);
        const groupId = courses[0].group_ids[0];
        const group = await db.getGroup(groupId);

        expect(group).toHaveProperty("course_id", "67210c7f8ee3047e8766f0e4");
        expect(group).toHaveProperty("_id", new ObjectId(groupId.toString()));
    });
});