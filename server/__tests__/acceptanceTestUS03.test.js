import { Db } from "../db/connection.js";

// Used since there is a student object in the test DB with these credentials
const student_id = "12345679";
const course_id = "67369b97fa731b9a41393c1c"

let db;

describe("Add student to course tests", () => {
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
});
