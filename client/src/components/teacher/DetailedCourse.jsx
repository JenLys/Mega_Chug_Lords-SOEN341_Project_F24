import DetailedCourseRow from "./DetailedCourseRow";
import StudentComment from "./StudentComment";

export default function DetailedCourse({ course }) {
  const reviews = course.studentReviews;
  course = course.course;

  const comments = [];

  reviews.forEach((review) => {
    if (review.reviews.length > 0) {
      review.reviews.forEach((r, idx) => {
        if (
          r.conceptual_comment.length > 0 ||
          r.cooperation_comment.length > 0 ||
          r.practical_comment.length ||
          r.work_ethic_comment.length > 0
        ) {
          comments.push(<StudentComment key={idx} review={r} student={review.student} />);
        }
      });
    }
  });

  return (
    <div>
      <span className="text-2xl">
        {course.dept} {course.number}
      </span>
      <table className="table-fixed border border-black border-collapse">
        <thead>
          <tr className="*:border *:border-black *:p-2">
            <th>Member</th>
            <th>Cooperation</th>
            <th>Conceptual Contribution</th>
            <th>Practical Contribution</th>
            <th>Work Ethic</th>
            <th>Average Across All</th>
          </tr>
        </thead>
        <tbody>
          {reviews.map((review, idx) => (
            <DetailedCourseRow review={review} key={idx} />
          ))}
        </tbody>
      </table>
      {comments.length > 0 ? (
        <>
          <span className="mt-8 text-2xl">Comments:</span>
          {comments.map((c) => c)}
        </>
      ) : (
        <>No comments</>
      )}
    </div>
  );
}
