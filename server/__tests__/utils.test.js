import { keepKeys } from "../utils"

describe("keepKeys", () => {
  test("returns object only with keys test, some ", async () => {
    const obj = {
      "test": 1,
      "some": 2,
      "thing": 3
    }
    const keptKeys = ["test", "some"]
    const expected = {
      "test": 1,
      "some": 2
    }
    expect(keepKeys(obj, keptKeys)).toStrictEqual(expected)
  })
  test("returns object only with keys test, some even if more kepts keys are specified ", async () => {
    const obj = {
      "test": 1,
      "some": 2,
      "thing": 3
    }
    const keptKeys = ["test", "some", "other"]
    const expected = {
      "test": 1,
      "some": 2
    }
    expect(keepKeys(obj, keptKeys)).toStrictEqual(expected)
  })
})

