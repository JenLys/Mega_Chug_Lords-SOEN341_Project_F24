import { useState, useEffect } from "react";
import { request } from "../../utils";
import { useAuth } from "../AuthProvider";
import SummaryCourse from "./SummaryCourse";

export default function SummaryDashboard() {
  const auth = useAuth();
  const user = auth.storedUser;
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const getCourses = async () => {
      try {
        const response = await request("/teacher/summary", "POST", {
          teacher_id: user.user_id,
        });
        if (!response.ok) {
          throw new Error("Could not get courses");
        }
        const res = await response.json();
        setCourses(res);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    getCourses();
  }, []);

  return (
    <div className="flex flex-col gap-8">
      <h1>Summary dashboard</h1>
      <div className="flex flex-col gap-4 overflow-y-auto">
        {courses.map((course, idx) => (
          <SummaryCourse course={course} key={idx} />
        ))}
      </div>
    </div>
  );
}
