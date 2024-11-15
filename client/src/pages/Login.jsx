import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/AuthProvider";
import { useState } from "react";
import TeacherLogin from "../components/teacher/TeacherLogin";
import StudentLogin from "../components/student/StudentLogin";

export default function Login() {
  const [isTeacherLogin, setIsTeacherLogin] = useState(false);
  const [isStudentLogin, setIsStudentLogin] = useState(false);
  const auth = useAuth();
  const user = auth.storedUser;
  const isLoggedIn = auth.isLoggedIn;
  const navigate = useNavigate();

  if (isLoggedIn) navigate("/");

  if (isTeacherLogin) {
    return (
      <div className="flex flex-col">
        <TeacherLogin />
        <button
          onClick={(e) => {
            e.preventDefault();
            setIsTeacherLogin(false);
            setIsStudentLogin(true);
          }}
          className="text-lg"
        >
          Student Login
        </button>
      </div>
    );
  } else if (isStudentLogin) {
    return (
      <div className="flex flex-col">
        <StudentLogin />
        <button
          onClick={(e) => {
            e.preventDefault();
            setIsStudentLogin(false);
            setIsTeacherLogin(true);
          }}
          className="text-lg"
        >
          Teacher Login
        </button>
      </div>
    );
  } else {
    return (
      <div className="flex flex-row gap-8">
        <button
          onClick={(e) => {
            e.preventDefault();
            setIsTeacherLogin(true);
          }}
          className="text-2xl border-solid border-black border-[3px] ease-in duration-50 p-4 rounded-3xl hover:invert hover:bg-white"
        >
          Login as Teacher
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            setIsStudentLogin(true);
          }}
          className="text-2xl border-solid border-black border-[3px] ease-in duration-50 p-4 rounded-3xl hover:invert hover:bg-white"
        >
          Login as Student
        </button>
      </div>
    );
  }
}
