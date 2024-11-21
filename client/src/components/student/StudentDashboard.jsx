import { useEffect, useState } from "react";
import { useAuth } from "../AuthProvider";
import { request } from "../../utils";
import { useNavigate } from "react-router-dom";

export default function StudentDashboard() {
  const auth = useAuth();
  const user = auth.storedUser;
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  
  const getAverage = (criteria) => {
    return (
      reviews.reduce((total, current) => {
        return total + current[criteria];
      }, 0) / reviews.length
    );
  };

  useEffect(() => {
    const getReviews = async () => {
      const res = await request("/student/summary", "POST", {
        student_id: user.user_id,
      })
        .then((res) => res.json())
        .catch(setIsLoading(false));
      console.log("res", res);

      setReviews(res);
      setIsLoading(false);
      console.log(res);
    };
    getReviews();
  }, [user.user_id]);

  if (!auth.isLoggedIn && user.role !== "student") navigate("/");

  if (isLoading) {
    return <>Loading...</>;
  } else if (reviews.length < 1) {
    return <>No reviews</>;
  } else {
    return (
      <div className="flex flex-col">
        <h1 className="text-4xl text-bold">Your summary:</h1>
        <div className="flex flex-col">
          <span>Conceptual: {getAverage("conceptual")}</span>
          <span>Cooperation: {getAverage("cooperation")}</span>
          <span>Practical: {getAverage("practical")}</span>
          <span>Work Ethic: {getAverage("work_ethic")}</span>
        </div>
      </div>
    );
  }
}
