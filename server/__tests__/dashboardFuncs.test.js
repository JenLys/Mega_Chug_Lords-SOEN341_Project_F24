const reviews = [
  {
    cooperation: 2,
    conceptual: 3,
    practical: 5,
    work_ethic: 5,
  },
  {
    cooperation: 1,
    conceptual: 0,
    practical: 0,
    work_ethic: 0,
  },
  {
    cooperation: 4,
    conceptual: 4,
    practical: 4,
    work_ethic: 4,
  },
  {
    cooperation: 2,
    conceptual: 2,
    practical: 2,
    work_ethic: 2,
  }
]
const getAverage = (criteria) => {
  return (
    reviews.reduce((total, current) => {
      return total + current[criteria];
    }, 0) / reviews.length
  );
};

describe("getAverage functions for summaries", () => {
  test("returns 9/4 average for cooperation average", async () => {
    const expected = 9/4
    const actual = getAverage("cooperation")
    expect(actual).toEqual(expected)
  })
  test("returns 9/4 average for conceptual average", async () => {
    const expected = 9 / 4
    const actual = getAverage("conceptual")
    expect(actual).toEqual(expected)
  })
  test("returns 11/4 average", async () => {
    const expected = 11 / 4
    const actual = getAverage("practical")
    expect(actual).toEqual(expected)
  })
  test("returns 11/4 average", async () => {
    const expected = 11 / 4
    const actual = getAverage("work_ethic")
    expect(actual).toEqual(expected)
  })
})

