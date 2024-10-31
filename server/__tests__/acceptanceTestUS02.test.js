import { Db } from "../db/connection.js";

// Used since there is a student object in the test DB with these credentials
const id = "87654321";
const pw = "Password!1";

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
        const data = await db.loginUser(id, pw, "teacher");
        expect(data).toBeTruthy();
    });
    
    test('rejects a login attempt with an invalid username', async () => {
        const data = await db.loginUser('mimimi', pw, "teacher");
        expect(data).toBeFalsy();
    });
    
    test('rejects a login attempt with an invalid password', async () => {
        const data = await db.loginUser(id, "mimimi", "teacher");
        expect(data).toBeFalsy();
    });

    test('returns true if the db returns the correct student object', async () => {
        const data = await db.loginUser(id, pw, "teacher");
        
        expect(data).toHaveProperty('fname', 'Tech');
        expect(data).toHaveProperty('lname', 'Art');
        expect(data).toHaveProperty('role', 'teacher');
        expect(data).toHaveProperty('user_id', "87654321");
        expect(data).toHaveProperty('pw', "Password!1");
    });
});
