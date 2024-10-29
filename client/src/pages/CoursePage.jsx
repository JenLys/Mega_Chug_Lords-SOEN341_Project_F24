import React, { useEffect, useState } from "react";

const CoursePage = () => {
  const [courses, setCourses] = useState([]);

  // Fetch courses from the backend when the component loads
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(
          `/api/students/courses?user_id=STUDENT_ID`
        );
        if (!response.ok) throw new Error("Failed to fetch courses");

        const data = await response.json();
        setCourses(data); // Set the fetched courses in state
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

  // Handler for adding a new course (dummy function for now)
  const handleAddCourse = () => {
    alert("Add Course button clicked!");
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>My Courses</h1>
      <div style={styles.courses}>
        {courses.map((course) => (
          <div
            key={course.id}
            style={{
              ...styles.course,
              backgroundColor: course.color || "#e0e0e0",
            }}
          >
            <div style={styles.courseName}>{course.name}</div>
          </div>
        ))}
      </div>
      <button onClick={handleAddCourse} style={styles.addButton}>
        Add Courses
      </button>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    padding: "20px",
    height: "100vh",
    marginTop: "50px", // Adjust based on your Navbar height
    overflowY: "auto", // Enable scrolling if needed
  },
  title: {
    fontSize: "24px",
    marginBottom: "20px",
  },
  courses: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)", // 4 columns for courses
    gap: "20px",
    width: "100%",
  },
  course: {
    padding: "20px",
    textAlign: "center",
    borderRadius: "8px",
    color: "white",
  },
  courseName: {
    fontSize: "18px",
  },
  addButton: {
    marginTop: "20px",
    padding: "10px 20px",
    fontSize: "16px",
    cursor: "pointer",
    backgroundColor: "#007BFF",
    color: "white",
    border: "none",
    borderRadius: "5px",
  },
};

export default CoursePage;

/*import React from "react";
import { Link } from "react-router-dom";
import "./CoursePage.css";

const CoursePage = () => {
  const courses = [
    { id: 1, name: "Course 1", imgSrc: "https://picsum.photos/id/237/200/301" },
    { id: 2, name: "Course 2", imgSrc: "https://picsum.photos/200/300" },
    { id: 3, name: "Course 3", imgSrc: "https://picsum.photos/id/257/200/300" },
    { id: 4, name: "Course 4", imgSrc: "https://picsum.photos/id/238/200/300" },
    { id: 5, name: "Course 5", imgSrc: "https://picsum.photos/id/239/200/300" },
    // Add more courses
  ];

  const handleAddCourse = () => {
    alert("Add Course button clicked!");
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>My Courses</h1>
      <div style={styles.courses}>
        {courses.map((course) => (
          <Link
            to={`/course/${course.id}`}
            key={course.id}
            className="courseLink"
          >
            <div className="course">
              <img
                src={course.imgSrc}
                alt={course.name}
                className="courseImage"
              />
              <div className="courseName">{course.name}</div>
            </div>
          </Link>
        ))}
      </div>
      <button onClick={handleAddCourse} className="addButton">
        Add Courses
      </button>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    padding: "20px",
    height: "100vh",
    maxWidth: "1000px", // Fixed maximum width
    margin: "0 auto", // Center the container horizontally
    marginTop: "230px",
  },
  title: {
    fontSize: "24px",
    marginBottom: "20px",
  },
  courses: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "20px",
    width: "100%",
    maxHeight: "60vh", // Fixed height for the grid
    overflowY: "auto", // Enable vertical scroll if there are many courses
    paddingRight: "10px", // Extra space to account for scrollbar
  },
};

export default CoursePage;*/
