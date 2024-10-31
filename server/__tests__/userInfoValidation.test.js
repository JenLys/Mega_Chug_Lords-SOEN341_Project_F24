import { validateId } from "../routes/validation"

describe("validateId", () => {
    test("returns true if id is 8 digits as int", async () => {
        const id = 12345678
        expect(await validateId(id)).toBe(true)
    })
    test("returns true if id is 8 digits as str", async () => {
        const id = "12345678"
        expect(await validateId(id)).toBe(true)
    })
    test("returns false if id is not 8 digits as int", async () => {
        const id = 1234567
        expect(await validateId(id)).toBe(false)
    })
    test("returns false if id is not 8 digits as str", async () => {
        const id = "1234567"
        expect(await validateId(id)).toBe(false)
    })
})

