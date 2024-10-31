import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "./teacher.css"

function TeacherView() {
    // State variables to manage component state
    const [selectedCourse, setSelectedCourse] = useState(null); // Stores the currently selected course
    const [courses, setCourses] = useState([]); // Stores the list of courses fetched from the API
    const [isHovered, setIsHovered] = useState({}); // Tracks which course is being hovered

    // Get the current location from react-router
    const location = useLocation();

    //Navigate function
    const navigate = useNavigate(); //use this to send back to log in

    // Effect hook to fetch courses when the component mounts
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                //get prof id from local storage
                const profId = localStorage.getItem('profId');
                if (!profId){
                    navigate('/login'); //send back the user
                    return;
                }

                const response = await fetch(`/teacher/courses?prof_id=${profId}`);
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
        setIsHovered(prevState => ({ ...prevState, [index]: true }));
    };

    // Function to clear hover effect
    const handleUnhover = (index) => {
        setIsHovered(prevState => ({
            ...prevState,
            [index]: false
        }));
    };

    // Function to handle course selection
    const handleClick = (course) => {
        setSelectedCourse(course.number);
    };

    return (
        <div>
            {selectedCourse ? (
                // Render when a course is selected
                <div>
                    <h1 style={{ fontSize: "80px", color: "white", marginBottom: "20px", fontWeight: "bold" }}>
                        {selectedCourse}
                    </h1>

                    <div style={{ display: "flex", gap: "10px" }}>
                        <button className="otherbtn">Create Teams</button>
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
                                    cursor: "pointer"
                                }}
                                onClick={() => setSelectedCourse(null)}
                            >
                                Back to Courses
                            </button>
                        </Link>
                    </div>
                </div>
            ) : (
                // Render when no course is selected
                <div>
                    <h1 style={{ fontSize: "40px", color: "white", marginBottom: "20px" }}>
                        Welcome, here are your courses!
                    </h1>
                    <br />
                    <div style={{ display: "flex", gap: "20px" }}>
                        {courses.map((course, index) => (
                            <div
                                key={index}
                                className="class-box"
                                style={{
                                    width: "150px",
                                    height: "100px",
                                    backgroundColor: "transparent",
                                    border: "3px solid white",
                                    borderRadius: 7,
                                    textAlign: "center",
                                    lineHeight: "100px",
                                    fontSize: "18px",
                                    color: "white",
                                    position: "relative"
                                }}
                                onClick={() => handleClick(course)}
                                onMouseOver={() => handleHover(index)}
                                onMouseOut={() => handleUnhover(index)}
                            >
                                <span>{course.number}</span> {/*course name from db*/}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default TeacherView;