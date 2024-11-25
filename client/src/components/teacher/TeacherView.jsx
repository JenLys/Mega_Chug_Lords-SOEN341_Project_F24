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
  const user = useAuth().storedUser;
  // Get the current location from react-router
  const location = useLocation();
  const [isAddingCourse, setIsAddingCourse] = useState(false);
  const [isCreatingGroup, setIsCreatingGroup] = useState(false);
  const [isViewingTeams, setIsViewingTeams] = useState(false);
  const [student, setStudent] = useState("");

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
    if (response != null) {
      window.alert("Created a new group.");
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

  const handleText = (e) => {
    setStudent(e.target.value);
  };

  const handleAddStudent = async (group_id) => {
    try {
      const response = await request("/courses/add-to-group", "POST", {
        group_id: group_id,
        user_id: student,
      });
      const data = await response.json();
      setGroups(data);
    } catch {
      console.error("Error fetching groups");
    }
  };

  return (
    <div>
      {selectedCourse ? (
        //if selected course = true
        isViewingTeams ? (
          //if isViewingTeams = true && selected course = true
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
              <div className="grid grid-cols-4 gap-4 p-4">
                {groups.map((group, index) => (
                  <div
                    key={index}
                    className="border rounded-md p-7 text-center"
                    style={{
                      border: "3px solid #FFFFFF",
                      borderRadius: "14px",
                    }}
                  >
                    <span className="font-bold">{group.group.name}</span>
                    <div className="mt-2">
                      {group.students.map((student, idx) => (
                        <div key={idx} className="text-sm">
                          Student ID: {student.user_id}
                        </div>
                      ))}
                    </div>
                    <button onClick={() => handleAddStudent(group.group._id)}>
                      Add Student
                    </button>
                    <textarea onChange={(e) => handleText(e)}></textarea>
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
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
                      display: "flex",
                      gap: "gap",
                    }}
                    onClick={() => {
                      setSelectedCourse(null);
                      setIsViewingTeams(false);
                    }}
                  >
                    Back to Courses
                  </button>
                </Link>
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
                  onClick={() => {
                    setSelectedCourse(null);
                    setIsViewingTeams(false);
                  }}
                >
                  Back to Courses
                </button>
              </Link>
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
              handleOpen();
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
