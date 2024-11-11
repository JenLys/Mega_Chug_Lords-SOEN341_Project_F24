export default function StudentCourseDetails({ course }) {
  return (
    <div className="border-4 rounded-md p-4 border-[#49618e] text-[#49618e] text-center text-2xl w-fit">
      <p className="font-bold">
        {course.dept} {course.number}
      </p>
    </div>
  );
}
