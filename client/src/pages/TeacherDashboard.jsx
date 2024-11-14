import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/AuthProvider";
import { useState } from "react";
import DetailedDashboard from "../components/teacher/DetailedDashboard";
import SummaryDashboard from "../components/teacher/SummaryDashboard";

export default function TeacherDashboard() {
  const auth = useAuth();
  const user = auth.storedUser;
  const navigate = useNavigate();
  const [isDetailedView, setIsDetailedView] = useState(false);

  if (!auth.isLoggedIn || user.role !== "teacher") navigate("/");

  const handleShowSummary = () => setIsDetailedView(false);
  const handleShowDetailed = () => setIsDetailedView(true);

  return (
    <div className="w-full h-full p-6 flex flex-col">
      <div className="max-w-7xl w-full self-center flex flex-col gap-4">
        <div className="text-3xl flex gap-8">
          <button
            className={
              "hover:scale-105 transition-all " +
              (isDetailedView ? "" : "underline")
            }
            onClick={handleShowSummary}
          >
            Summary
          </button>
          <button
            className={
              "hover:scale-105 transition-all " +
              (isDetailedView ? "underline" : "")
            }
            onClick={handleShowDetailed}
          >
            Detailed
          </button>
        </div>
        {isDetailedView ? <DetailedDashboard /> : <SummaryDashboard />}
      </div>
    </div>
  );
}
