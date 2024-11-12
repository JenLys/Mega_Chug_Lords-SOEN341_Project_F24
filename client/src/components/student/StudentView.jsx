import { useEffect, useState } from "react";
import { request } from "../../utils";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthProvider";
import StudentAddCourse from "./StudentAddCourse";
import StudentCourseDetails from "./StudentCourseDetails";
import { Modal } from "@mui/material";

const StudentView = () => {
  const auth = useAuth();
  const user = auth.storedUser;
  const [courses, setCourses] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isAddingCourse, setIsAddingCourse] = useState(false);
  const navigate = useNavigate();

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

  // Function to handle opening the "Add Course" modal
  const handleOpen = () => setIsAddingCourse(true);
  const handleClose = () => setIsAddingCourse(false);

  // Function to add a new course
  const handleCourseAddition = (newCourse) => {
    setCourses([...courses, newCourse]);
  };

  // Function to fetch and view team members for a selected course
  const handleSelectCourse = async (courseId) => {
    try {
      const response = await request(`/student/team/${courseId}`, "GET");
      if (!response.ok) {
        throw new Error("Could not get team members");
      }
      const teamData = await response.json();
      setTeamMembers(teamData);
      setSelectedCourse(courseId);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Go back to the course list
  const handleBackToCourses = () => {
    setSelectedCourse(null);
    setTeamMembers([]);
  };

  if (!auth.isLoggedIn) navigate("/login");

  return (
    <div className="flex flex-col gap-5 justify-around">
      {selectedCourse ? (
        // If a course is selected, show team members
        <div>
          <h2 className="text-3xl">Team Members for Course {selectedCourse}</h2>
          <button
            className="text-lg border-solid border-2 p-2 rounded-md mt-4"
            onClick={handleBackToCourses}
          >
            Back to Courses
          </button>
          <div className="mt-5">
            {teamMembers.length > 0 ? (
              teamMembers.map((member, idx) => (
                <div key={idx} className="p-3 border-b">
                  {member.name} - {member.email}
                </div>
              ))
            ) : (
              <p>No team members found.</p>
            )}
          </div>
        </div>
      ) : (
        // If no course is selected, show the course list
        <div>
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
          <div className="grid grid-cols-4 grid-flow-row gap-3 mt-5">
            {courses.map((course, idx) => (
              <div key={idx} className="border p-4 rounded-lg">
                <StudentCourseDetails course={course} />
                <button
                  className="mt-3 text-sm border-solid border-2 p-1 rounded-md"
                  onClick={() => handleSelectCourse(course.id)}
                >
                  View Team
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentView;
