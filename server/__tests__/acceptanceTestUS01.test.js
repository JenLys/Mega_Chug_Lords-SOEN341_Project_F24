import { Db } from "../db/connection.js";

// Used since there is a student object in the test DB with these credentials
const id = "12345679";
const pw = "Password!2";

let db;

describe("Student login tests", () => {
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
        const data = await db.getUserLogin(id, pw);
        expect(data).toBeTruthy();
    });
    
    test('rejects a login attempt with an invalid username', async () => {
        const data = await db.getUserLogin('mimimi', pw);
        expect(data).toBeFalsy();
    });
    
    test('rejects a login attempt with an invalid password', async () => {
        const data = await db.getUserLogin(id, "mimimi");
        expect(data).toBeFalsy();
    });

    test('returns true if the db returns the correct student object', async () => {
        const data = await db.getUserLogin(id, pw);
    
        expect(data).toHaveProperty('fname', 'Dent');
        expect(data).toHaveProperty('lname', 'Stue');
        expect(data).toHaveProperty('role', 'student');
        expect(data).toHaveProperty('user_id', '12345679');
        expect(data).toHaveProperty('pw', 'Password!2');
    });
});
