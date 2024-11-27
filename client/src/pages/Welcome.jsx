import { useEffect } from "react";
import { useAuth } from "../components/AuthProvider";
import StudentView from "../components/student/StudentView";
import TeacherView from "../components/teacher/TeacherView";

function Welcome() {
  const auth = useAuth();
  const user = auth.storedUser;
  const isLoggedIn = auth.isLoggedIn;

  useEffect(() => {}, [isLoggedIn]);

  if (user.role === "teacher") {
    return <TeacherView />;
  } else if (user.role === "student") {
    return <StudentView />;
  } else {
    return (
      <div className="w-full h-full bg-[#598da478] flex align-middle justify-center"
       style={{
        display: "flex", alignItems: "center", justifyContent: "center",width:"100%", height:"100%",
       }}
      >
        <div className="pt-10 flex flex-col *:self-center gap-8 text-center ">
          <h1 className="text-8xl font-semibold text-white"
          style={{
          fontSize:"10rem", fontFamily:"'Poppins', sans-serif", color:"transparent", WebkitTextStroke:"1px white", fontWeight:"600",
          }}
          >ReviewMate</h1>
          <a
            className="w-fit text-xl border-solid border-black border-[3px] ease-in duration-50 p-3 rounded-xl hover:invert hover:bg-white"
            href="/login"
            stylel={{
              width:"fit-content",
              fontSize:"2rem",
              border:"2px solid white",
              color:"white",
              padding: "10px 20px",
              borderRadius: "10px",
              textDecoration: "none",
              backgroundColor:"transparent",
              display: "inline-block",
              transition: "background-color 0.3s ease",
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "blue")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "transparent")}

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
