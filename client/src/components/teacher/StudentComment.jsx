export default function StudentComment({ student, review }) {
  return (
    <>
      <div className="ml-10">
        {student.fname} {student.lname}
        <div className="ml-5">
          {review.conceptual_comment.length > 0 ? (
            <div>
              <h1 className="font-bold">Conceptual</h1>
              <p>{review.conceptual_comment}</p>
            </div>
          ) : null}
          {review.cooperation_comment.length > 0 ? (
            <div>
              <h1 className="font-bold">Cooperation</h1>
              <p>{review.cooperation_comment}</p>
            </div>
          ) : null}
          {review.practical_comment.length > 0 ? (
            <div>
              <h1 className="font-bold">Practical</h1>
              <p>{review.practical_comment}</p>
            </div>
          ) : null}
          {review.work_ethic_comment.length > 0 ? (
            <div>
              <h1 className="font-bold">Work Ethic</h1>
              <p>{review.work_ethic_comment}</p>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
}
