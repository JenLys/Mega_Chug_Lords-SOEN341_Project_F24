import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { request } from "../../utils";
import { useAuth } from "../AuthProvider";
import Modal from "@mui/material/Modal";
import TeacherAddCourse from "./TeacherAddCourse";
import TeacherAddGroup from "./TeacherAddGroup";
import GroupsDisplay from "./GroupsDisplay";

function TeacherView() {
  // State variables to manage component state
  const [selectedCourse, setSelectedCourse] = useState(null); // Stores the currently selected course
  const [courses, setCourses] = useState([]); // Stores the list of courses fetched from the API
  const [groups, setGroups] = useState([]);
  const user = useAuth().storedUser;
  const [isAddingCourse, setIsAddingCourse] = useState(false);
  const [isCreatingGroup, setIsCreatingGroup] = useState(false);
  const [isViewingTeams, setIsViewingTeams] = useState(false);

  // Effect hook to fetch courses when the component mounts
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await request("/teacher/courses", "GET", {
          prof_id: user.user_id,
        });
        const data = await response.json();
        setCourses(data); // Update the courses state with fetched data
      } catch {
        console.error("Error fetching courses");
      }
    };
    fetchCourses();
  }, [user?.user_id]);

  if (!user || user.role != "teacher") return <Navigate to="/login" />;

  const getGroupInfo = async (courseId) => {
    try {
      const response = await request("/teacher/group-info", "GET", {
        course_id: courseId,
      });
      const data = await response.json();
      setGroups(data);
    } catch {
      console.error("Error fetching groups");
    }
  };

  const handleCourseAddition = (newCourse) => {
    setCourses([...courses, newCourse]);
  };

  const handleGroupAddition = (newGroup) => {
    setGroups([...groups, newGroup]);
  };

  // Function to handle course selection
  const handleClick = (course) => {
    setSelectedCourse(course);
    getGroupInfo(course._id);
  };

  const handleCreateGroup = async () => {
    const response = await request("/courses/create-group", "POST", {
      course_id: selectedCourse._id,
    });

    // Confirms when the group creating is successful
    const newGroup = await response.json();
    if (response.ok) {
      window.alert("Created a new group.");
      handleGroupAddition({ group: newGroup, students: [] });
      setIsViewingTeams(true);
    } else {
      window.alert("Error creating a new group.");
    }
    return;
  };

  // handleOpen performs different functions depending on string parameter
  const handleOpen = (mode) => {
    switch (mode) {
      case "course": {
        setIsAddingCourse(true);
        break;
      }
      case "group": {
        setIsCreatingGroup(true);
        break;
      }
      default:
        break;
    }
    return;
  };
  const handleClose = (mode) => {
    switch (mode) {
      case "course": {
        setIsAddingCourse(false);
        break;
      }
      case "group": {
        setIsCreatingGroup(false);
        break;
      }
      default:
        break;
    }
    return;
  };

  const handleAddStudent = async (data, group_id, index) => {
    try {
      const response = await request("/courses/add-to-group", "POST", {
        group_id: group_id,
        user_id: data.student_id,
      });
      const addedStudent = await response.json();
      if (response.ok && addedStudent != null) {
        const newGroups = [...groups]
        newGroups[index].students.push(addedStudent.student);
        setGroups(newGroups);
        setCourses(courses);
      }
    } catch {
      console.error("Error fetching groups");
    }
  };

  return (
    <div>
      {selectedCourse ? (
        isViewingTeams ? (
          <div>
            <h1
              style={{
                fontSize: "80px",
                color: "white",
                textAlign: "center",
                marginLeft: "auto",
                marginRight: "auto",
                fontWeight: "bold",
              }}
            >
              {selectedCourse.dept} {selectedCourse.number}
            </h1>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <GroupsDisplay
                groups={groups}
                handleAddStudent={handleAddStudent}
              />
              <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
                <button
                  style={{
                    padding: "10px 20px",
                    fontSize: "16px",
                    borderRadius: "5px",
                    backgroundColor: "rgb(73, 97, 142)",
                    color: "white",
                    border: "none",
                    cursor: "pointer",
                    display: "flex",
                    gap: "gap",
                  }}
                  onClick={() => {
                    setIsViewingTeams(false);
                  }}
                >
                  Back to Course
                </button>
              </div>
            </div>
          </div>
        ) : (
          //if viewing teams is false && selected course = true
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
              <button
                className="otherbtn"
                style={{
                  padding: "10px 20px",
                  fontSize: "16px",
                  borderRadius: "5px",
                  backgroundColor: "rgb(73, 97, 142)",
                  color: "white",
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  gap: "gap",
                }}
                onClick={async (e) => {
                  e.preventDefault();
                  handleCreateGroup();
                }}
              >
                Create a Group
              </button>
              <Modal open={isCreatingGroup} onClose={handleClose}>
                <TeacherAddGroup
                  handleClose={handleClose}
                  addNewGroup={handleGroupAddition}
                />
              </Modal>

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
                onClick={() => setIsViewingTeams(true)}
              >
                {" "}
                View Teams
              </button>
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
                onClick={() => {
                  setSelectedCourse(null);
                  setIsViewingTeams(false);
                }}
              >
                Back to Courses
              </button>
            </div>
          </div>
        )
      ) : (
        //if selected course = false
        <div className="flex flex-col gap-5 justify-around">
          <h1 className="text-4xl">
            Welcome {user.fname} {user.lname}, here are your courses!
          </h1>
          <button
            className="text-xl border-solid border-2 w-fit p-2 rounded-md self-center"
            onClick={(e) => {
              e.preventDefault();
              handleOpen("course");
            }}
          >
            Add Course
          </button>
          <Modal open={isAddingCourse} onClose={() => handleClose("course")}>
            <TeacherAddCourse
              handleClose={() => handleClose("course")}
              addNewCourse={handleCourseAddition}
            />
          </Modal>
          <div className="grid grid-cols-4 grid-flow-row gap-3">
            {courses.map((course, index) => (
              <div
                key={index}
                className="border-4 rounded-md p-4 border-[#49618e] text-[#49618e] text-center text-2xl"
                onClick={() => handleClick(course)}
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
