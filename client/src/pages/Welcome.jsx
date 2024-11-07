import video from "../assets/video.webm";
import { useEffect } from "react";
import { useAuth } from "../components/AuthProvider";
import StudentView from "../components/StudentView";
import TeacherView from "./TeacherView";

function Welcome() {
  const auth = useAuth();
  const user = auth.storedUser;
  const isLoggedIn = auth.isLoggedIn;
  console.log("welcome user", user);

  useEffect(() => {}, [isLoggedIn]);

  if (user.role === "teacher") {
    return <TeacherView />;
  } else if (user.role === "student") {
    return <StudentView user={user} />;
  } else {
    return (
      <div className="w-full h-full bg-[#598da478] flex align-middle justify-center">
        <div className="pt-10 flex flex-col *:self-center gap-8 text-center ">
          <h1 className="text-8xl font-semibold text-white">ReviewMate</h1>
          <a
            className="w-fit text-xl border-solid border-black border-[3px] ease-in duration-50 p-3 rounded-xl hover:invert hover:bg-white"
            href="/login"
          >
            Login
          </a>
          <a
            className="w-fit text-xl border-solid border-black border-[3px] ease-in duration-50 p-3 rounded-xl hover:invert hover:bg-white"
            href="/registration"
          >
            Register
          </a>
        </div>
      </div>
    );
  }
}

export default Welcome;
