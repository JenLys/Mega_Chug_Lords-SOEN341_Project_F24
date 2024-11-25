export default function SummaryCourseRow({ review }) {
  const reviews = review.reviews;
  const student = review.student;
  const getAverage = (criteria) => {
    return reviews.reduce((total, current) => {
      return total + current[criteria];
    }, 0) / reviews.length;
  };

  const getTotalAverage = () => {
    return (getAverage("cooperation") + getAverage("conceptual") + getAverage("practical") + getAverage("work_ethic")) / 4
  }

  if (student === null) return null;

  return (
    <tr className="*:border *:border-black *:p-2">
      <td>{student.user_id}</td>
      <td>{student.lname}</td>
      <td>{student.fname}</td>
      {reviews.length > 0 ? (
        <>
          <td>{getAverage("cooperation")}</td>
          <td>{getAverage("conceptual")}</td>
          <td>{getAverage("practical")}</td>
          <td>{getAverage("work_ethic")}</td>
          <td>{getTotalAverage()}</td>
          <td>{reviews.length}</td>
        </>
      ) : (
        <td colSpan="6" className="text-center">No reviews</td>
      )}
    </tr>
  );
}
