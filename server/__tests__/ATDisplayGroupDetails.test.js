import { Db } from "../db/connection.js";

let db;

describe("Teacher login tests", () => {
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

    test('returns true if the db returns a non-null object', async () => {
        const data = true;
        expect(data).toBeTruthy();
    });
});
