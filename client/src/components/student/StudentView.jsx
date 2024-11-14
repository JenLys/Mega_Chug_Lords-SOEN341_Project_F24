import { useEffect, useState } from "react";
import { request } from "../../utils";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthProvider";
import StudentAddCourse from "./StudentAddCourse";
import StudentCourseDetails from "./StudentCourseDetails";
import { Modal } from "@mui/material";
import RatingModal from "./RatingModal";
import { Rating } from "react-simple-star-rating";

const StudentView = () => {
  const auth = useAuth();
  const user = auth.storedUser;
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();
  const [isAddingCourse, setIsAddingCourse] = useState(false);
  const [isReviewing, setIsReviewing] = useState(false);

  useEffect(() => {
    const getCourses = async (data) => {
      try {
        const response = await request("/student/courses", "GET", data);
        if (!response.ok) {
          throw new Error("Could not get courses");
        }
        const res = await response.json();
        setCourses(res);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    getCourses({ student_id: user.user_id });
  }, [user.user_id]);

  
  const handleOpen = () => setIsAddingCourse(true);
  const handleClose = () => setIsAddingCourse(false);

  const handleCourseAddition = (newCourse) => {
    setCourses([...courses, newCourse])
  }

  if (!auth.isLoggedIn) navigate("/login");

  return (
    <div className="flex flex-col gap-5 justify-around">
      <h1 className="text-4xl">
        Welcome {user.fname} {user.lname}, here are your courses!
      </h1>
      <button
        className="text-xl border-solid border-2 w-fit p-2 rounded-md self-center"
        onClick={handleOpen}
      >
        Add Course
      </button>
      <Modal open={isAddingCourse} onClose={handleClose}>
        <StudentAddCourse
          handleClose={handleClose}
          addNewCourse={handleCourseAddition}
        />
      </Modal>
      <button
        className="text-xl border-solid border-2 w-fit p-2 rounded-md self-center"
        onClick={() => setIsReviewing(true)}
      >
        Add Review
      </button>
      <Modal open={isReviewing} onClose={() => setIsReviewing(false)}>
        <RatingModal
          handleClose={() => setIsReviewing(false)}
        />
      </Modal>
      <div className="grid grid-cols-4 grid-flow-row gap-3">
        {courses.map((course, idx) => (
          <StudentCourseDetails key={idx} course={course} />
        ))}
      </div>
    </div>
  );
};

export default StudentView;
