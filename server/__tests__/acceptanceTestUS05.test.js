// Student reviewing teammates tests
import { Db } from "../db/connection.js";

let db;

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

    test('create review object', async () => {
        // test to be implemented
    });
});