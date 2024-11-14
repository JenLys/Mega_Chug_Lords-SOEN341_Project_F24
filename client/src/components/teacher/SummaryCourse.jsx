import SummaryCourseRow from "./SummaryCourseRow";

export default function SummaryCourse({course}) {
  const reviews = course.studentReviews;
  course = course.course

  console.log(course, reviews);
  
  
  return (
    <div>
      <span className="text-2xl">
        {course.dept} {course.number}
      </span>
      <table className="table-fixed border border-black border-collapse">
        <thead>
          <tr className="*:border *:border-black *:p-2">
            <th>Student ID</th>
            <th>Last name</th>
            <th>Fast name</th>
            {/* Add group */}
            <th>Cooperation</th>
            <th>Conceptual Contribution</th>
            <th>Practical Contribution</th>
            <th>Work Ethic</th>
            <th>Average</th>
            <th>Peers who responded</th>
          </tr>
        </thead>
        <tbody>
          {reviews.map((review, idx) => (
            <SummaryCourseRow key={idx} review={review} />
          ))}
        </tbody>
      </table>
    </div>
  );
}