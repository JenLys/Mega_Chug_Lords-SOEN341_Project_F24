import { useState, useEffect } from "react";
import { request } from "../../utils";
import { useAuth } from "../AuthProvider";
import DetailedCourse from "./DetailedCourse.jsx";

export default function DetailedDashboard() {
  const auth = useAuth();
  const user = auth.storedUser;
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState();

  useEffect(() => {
    const getCourses = async () => {
      setIsLoading(true);
      try {
        const response = await request("/teacher/summary", "POST", {
          teacher_id: user.user_id,
        });
        if (!response.ok) {
          throw new Error("Could not get courses");
        }
        const res = await response.json();
        setCourses(res);
        setIsLoading(false);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    getCourses();
  }, [user.user_id]);

  if (isLoading) {
    return <span>Loading...</span>;
  } else {
    return (
      <div className="flex flex-col gap-8">
        <h1>Detailed dashboard</h1>
        <div className="flex flex-col gap-4 overflow-y-hidden">
          {courses.map((course, idx) => (
            <DetailedCourse course={course} key={idx} />
          ))}
        </div>
      </div>
    );
  }
}
