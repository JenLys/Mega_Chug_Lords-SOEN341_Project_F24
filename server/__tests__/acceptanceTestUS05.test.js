// Student reviewing teammates tests
import { Db } from "../db/connection.js";
import { ObjectId } from "mongodb";

let db;
const courseId = new ObjectId('6731419279670bfaeaacbafb'); // ENGR 233 course
const groupId = new ObjectId("673653072f37534ddf7f2379") // ID of Group#1 in ENGR 233
const studentId = "12345678" // One of the students in ENGR 233

describe("Student reviews tests", () => {
    // We only want to open the DB connection once
    beforeAll( () => {
        // 'true' opens connection to test db instead of main db; see connection.js
        db = new Db(true);  
        return db;
    });
    afterAll( () => {
        try {
            db.disconnectDb();
        } catch (error) {
            console.error(error);
        }
    });

    test('db returns a non-null group object', async () => {
        const group = await db.getGroupWithCourseAndMember(courseId, studentId);
        expect(group).toBeTruthy();
    });

    test('db returns the correct group object', async () => {
        const group = await db.getGroupWithCourseAndMember(courseId, studentId);
        expect(group._id).toEqual(groupId);
    });
});