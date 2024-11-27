import { useState } from "react";
import TeacherRegistration from "../components/teacher/TeacherRegistration";
import StudentRegistration from "../components/student/StudentRegistration";

export default function Registration() {
  const [isTeacherRegistering, setIsTeacherRegistering] = useState(false);
  const [isStudentRegistering, setIsStudentRegistering] = useState(false);

  if (isTeacherRegistering) {
    return (
      <div className="flex flex-col">
        <TeacherRegistration />
        <button
          onClick={(e) => {
            e.preventDefault();
            setIsTeacherRegistering(false);
            setIsStudentRegistering(true);
          }}
          className="text-lg"
        >
          Register as Student
        </button>
      </div>
    );
  } else if (isStudentRegistering) {
    return (
      <div className="flex flex-col">
        <StudentRegistration />
        <button
          onClick={(e) => {
            e.preventDefault();
            setIsTeacherRegistering(true);
            setIsStudentRegistering(false);
          }}
          className="text-lg"
        >
          Register as Teacher
        </button>
      </div>
    );
  } else {
    return (
      <div className="flex flex-row gap-8">
        <button
          onClick={(e) => {
            e.preventDefault();
            setIsTeacherRegistering(true);
          }}
          className="text-2xl border-white border-2 text-blue p-3 rounded-xl bg-transparent hover:bg-blue-500 hover:text-white transition duration-300"
        >
          Register as Teacher
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            setIsStudentRegistering(true);
          }}
          className="text-2xl border-white border-2 text-blue p-3 rounded-xl bg-transparent hover:bg-blue-500 hover:text-white transition duration-300"
        >
          Register as Student
        </button>
      </div>
    );
  }
}
