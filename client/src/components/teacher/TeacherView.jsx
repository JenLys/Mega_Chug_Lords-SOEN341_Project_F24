import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { request } from "../../utils";
import { useAuth } from "../AuthProvider";
import Modal from "@mui/material/Modal";
import TeacherAddCourse from "./TeacherAddCourse";
import TeacherAddGroup from "./TeacherAddGroup";

function TeacherView() {
  // State variables to manage component state
  const [selectedCourse, setSelectedCourse] = useState(null); // Stores the currently selected course
  const [courses, setCourses] = useState([]); // Stores the list of courses fetched from the API
  const [groups, setGroups] = useState([]);
  const [isHovered, setIsHovered] = useState({}); // Tracks which course is being hovered
  const user = useAuth().storedUser;
  // Get the current location from react-router
  const location = useLocation();
  const [isAddingCourse, setIsAddingCourse] = useState(false);
  const [isCreatingGroup, setIsCreatingGroup] = useState(false);

  if (!user || user.role != "teacher") return <Navigate to="/login" />;

  // Effect hook to fetch courses when the component mounts
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await request("/teacher/courses", "GET", {
          prof_id: user.user_id,
        });
        const data = await response.json();
        setCourses(data); // Update the courses state with fetched data
      } catch (error) {
        console.error("Error fetching courses");
      }
    };
    fetchCourses();
  }, []);

  // Function to handle hover effect
  const handleHover = (index) => {
    setIsHovered((prevState) => ({ ...prevState, [index]: true }));
  };

  const handleCourseAddition = (newCourse) => {
    setCourses([...courses, newCourse]);
  };

  const handleGroupAddition = (newGroup) => {
    setGroups([...groups, newGroup]);
  }

  // Function to clear hover effect
  const handleUnhover = (index) => {
    setIsHovered((prevState) => ({
      ...prevState,
      [index]: false,
    }));
  };

  // Function to handle course selection
  const handleClick = (course) => {
    setSelectedCourse(course);
  };

  // handleOpen performs different functions depending on string parameter
  const handleOpen = (mode) => {
    switch (mode) {
      case 'course': {
        setIsAddingCourse(true);
        break;
      }
      case 'group': {
        setIsCreatingGroup(true);
        break;
      }
      default: break;
    }
    return;
  }
  const handleClose = (mode) => {
    switch(mode) {
      case 'course': { 
        setIsAddingCourse(false);
        break;
      } 
      case 'group': {
        setIsCreatingGroup(false);
        break;
      }
      default: break;
    }
    return;
  }

  return (
    <div>
      {selectedCourse ? (
        <div>
          <h1
            style={{
              fontSize: "80px",
              color: "white",
              marginBottom: "20px",
              fontWeight: "bold",
            }}
          >
            {selectedCourse.dept} {selectedCourse.number}
          </h1>
          <div style={{ display: "flex", gap: "10px" }}>
            <button className="otherbtn"
              onClick={(e) => {
                e.preventDefault();
                handleOpen('group');
              }}
              >Create Teams
            </button>
            <Modal open={isCreatingGroup} onClose={handleClose}>
              <TeacherAddGroup
                handleClose={handleClose}
                addNewGroup={handleGroupAddition}
                />
            </Modal>
            
            <button className="otherbtn">View Teams</button>
            
            <Link to={location.pathname}>
              <button
                style={{
                  padding: "10px 20px",
                  fontSize: "16px",
                  borderRadius: "5px",
                  backgroundColor: "rgb(73, 97, 142)",
                  color: "white",
                  border: "none",
                  cursor: "pointer",
                }}
                onClick={() => setSelectedCourse(null)}
              >
                Back to Courses
              </button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-5 justify-around">
          <h1 className="text-4xl">
            Welcome {user.fname} {user.lname}, here are your courses!
          </h1>
          <button className="text-xl border-solid border-2 w-fit p-2 rounded-md self-center"
            onClick={(e) => {
              e.preventDefault();
              handleOpen('course');
            }}
          >
            Add course
          </button>
          <Modal open={isAddingCourse} onClose={handleClose}>
            <TeacherAddCourse
              handleClose={handleClose}
              addNewCourse={handleCourseAddition}
            />
          </Modal>
          <div className="grid grid-cols-4 grid-flow-row gap-3">
            {courses.map((course, index) => (
              <div
                key={index}
                className="border-4 rounded-md p-4 border-[#49618e] text-[#49618e] text-center text-2xl"
                onClick={() => handleClick(course)}
                onMouseOver={() => handleHover(index)}
                onMouseOut={() => handleUnhover(index)}
              >
                <span className="font-bold">
                  {course.dept} {course.number}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default TeacherView;
