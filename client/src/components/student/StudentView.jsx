import { useEffect, useState } from "react";
import { request } from "../../utils";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthProvider";
import StudentAddCourse from "./StudentAddCourse";
import StudentCourseDetails from "./StudentCourseDetails";
import MyTeam from "./MyTeam";
import { Modal } from "@mui/material";

const StudentView = () => {
  const auth = useAuth();
  const user = auth.storedUser;
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();
  const [isAddingCourse, setIsAddingCourse] = useState(false);
  /*To make the Modal work*/
  const[isViewingTeam, setIsViewingTeam] = useState(false);
  const[selectedCourse, setSelectedCourse] = useState(null); /*tracks if the button to view the team is selected since it triggers the team view */ 
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
  }, [user.user_id, isViewingTeam]);

  
  const handleOpen = () => setIsAddingCourse(true);
  const handleClose = () => setIsAddingCourse(false);
  /*boolean handlers for the Team modal */
  const handleOpenTeam = () => setIsViewingTeam(true);
  const handleCloseTeam = () => setIsViewingTeam(false);

  const handleCourseAddition = (newCourse) => {
    setCourses([...courses, newCourse])
  }

  /*was the button to view selected? (idk if it was added, it doesn't seem like it so I have included it here) */
  const handleCourseClick= (course) =>{
    setSelectedCourse(course);
  };

  if (!auth.isLoggedIn) navigate("/login");

  return (
    <div className="flex flex-col gap-5 justify-around">
      <h1 className="text-4xl" style={{color: "white"}}>
        Welcome {user.fname} {user.lname}, here are your courses!
      </h1>
      <button
        className="text-xl border-solid border-2 w-fit p-2 rounded-md self-center"
        onClick={handleOpen}
        style={{color:"white"}}
      >
        Add Course
      </button>
      <Modal open={isAddingCourse} onClose={handleClose}>
        <StudentAddCourse
          handleClose={handleClose}
          addNewCourse={handleCourseAddition}
        />
      </Modal>

      <div className="grid grid-cols-4 grid-flow-row gap-3">
        {courses.map((course, idx) => (
          <div key={idx} onClick={() => handleCourseClick(course)}>
          <StudentCourseDetails key={idx} course={course} />
          {/*button to view teammates should display only when a course gets selected 
          check with the course id since it's unique*/}
          {selectedCourse && selectedCourse.id === course.id && (
            <button
              className="text-sm mt-2 p-1 border rounded-md bg-blue-500 text-white"
              onClick={handleOpenTeam} /*Not sure if this button was already implemented or not, but
               here I'm adding it just in case: when you click it it renders the next Modal*/
            >
              View my Team
            </button>
          )}
        </div>
        ))}
      </div>
      {/*Displays the Team view modal */}
      <Modal open={isViewingTeam} onClose={handleCloseTeam}>
        <MyTeam /> {/*render MyTeam.jsx */}
      </Modal>
    </div>
  );
};

export default StudentView;
