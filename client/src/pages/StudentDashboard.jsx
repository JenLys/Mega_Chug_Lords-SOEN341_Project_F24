import { useEffect, useState } from "react";
import { useAuth } from "../components/AuthProvider";
import { request } from "../utils";
import { useNavigate } from "react-router-dom";

export default function StudentDashboard() {
  const auth = useAuth();
  const user = auth.storedUser;
  const [reviews, setReviews] = useState([]);
  const [isLoadingSummary, setIsLoadingSummary] = useState(true);
  const [isLoadingLeaderboard, setIsLoadingLeaderboard] = useState(true);
  const [leaderboard, setLeaderboard] = useState([]);
  const navigate = useNavigate();

  const getAverage = (criteria) => {
    return (
      reviews.reduce((total, current) => {
        return total + current[criteria];
      }, 0) / reviews.length
    );
  };

  useEffect(() => {
    const getLeaderboard = async () => {
      const res = await request("/courses/leaderboard", "GET")
        .then((res) => res.json())
        .catch(setIsLoadingLeaderboard(false));
      setLeaderboard(res);
      setIsLoadingLeaderboard(false);
    };
    getLeaderboard();
  }, []);

  useEffect(() => {
    const getReviews = async () => {
      const res = await request("/student/summary", "POST", {
        student_id: user.user_id,
      })
        .then((res) => res.json())
        .catch(setIsLoadingSummary(false));
      setReviews(res);
      setIsLoadingSummary(false);
    };
    getReviews();
  }, [user.user_id]);

  if (!auth.isLoggedIn && user.role !== "student") navigate("/");

  if (!isLoadingSummary && reviews.length < 1 && !isLoadingLeaderboard) {
    return (
      <>
        <div>No reviews</div>
        <div className="flex flex-col">
          {leaderboard.map((student, idx) => {
            return (
              <span key={idx}>
                {idx + 1}. {student.student.fname} {student.student.lname}
              </span>
            );
          })}
        </div>
      </>
    );
  } else if (!isLoadingSummary && isLoadingLeaderboard) {
    return (
      <>
        <div className="flex flex-col">
          <h1 className="text-4xl text-bold">Your summary:</h1>
          <div className="flex flex-col">
            <span>Conceptual: {getAverage("conceptual")}</span>
            <span>Cooperation: {getAverage("cooperation")}</span>
            <span>Practical: {getAverage("practical")}</span>
            <span>Work Ethic: {getAverage("work_ethic")}</span>
          </div>
        </div>
        <div>Leaderboard loading...</div>
      </>
    );
  } else {
    return (
      <div className="flex flex-col">
        <div className="flex flex-col">
          <h1 className="text-4xl text-bold">Your summary:</h1>
          <div className="flex flex-col">
            <span>Conceptual: {getAverage("conceptual")}</span>
            <span>Cooperation: {getAverage("cooperation")}</span>
            <span>Practical: {getAverage("practical")}</span>
            <span>Work Ethic: {getAverage("work_ethic")}</span>
          </div>
        </div>
        <div>
          <span className="text-4xl text-bold">Leaderboard: </span>
          <div className="flex flex-col">
            {leaderboard.map((student, idx) => {
              return (
                <span key={idx}>
                  {idx + 1}. {student.student.fname} {student.student.lname}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}
