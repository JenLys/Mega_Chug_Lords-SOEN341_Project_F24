export default function DetailedCourseRow({ review }) {
  const reviews = review.reviews;
  const student = review.student;
  const getAverage = (criteria) => {
    return (
      reviews.reduce((total, current) => {
        return total + current[criteria];
      }, 0) / reviews.length
    );
  };

  const getTotalAverage = () => {
    return (
      (getAverage("cooperation") +
        getAverage("conceptual") +
        getAverage("practical") +
        getAverage("work_ethic")) /
      4
    );
  };

  if (student === null) return null;

  return (
    <tr className="*:border *:border-black *:p-2">
      <td>
        {student.fname} {student.lname}
      </td>
      {reviews.length > 0 ? (
        <>
          <td>{getAverage("cooperation")}</td>
          <td>{getAverage("conceptual")}</td>
          <td>{getAverage("practical")}</td>
          <td>{getAverage("work_ethic")}</td>
          <td>{getTotalAverage()}</td>
        </>
      ) : (
        <td colSpan="5" className="text-center">
          No reviews
        </td>
      )}
    </tr>
  );
}
