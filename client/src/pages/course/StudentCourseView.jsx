/*import React, { useEffect, useState } from "react";

const CoursePage = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // Fetch courses from the backend
    const fetchCourses = async () => {
      try {
        const response = await axios.get("/api/courses"); // Ensure this path matches your server setup
        const updatedCourses = response.data.map((course) => ({
          ...course,
          bgColor: getRandomColor(), // Assign random color
        }));
        setCourses(updatedCourses);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };
    fetchCourses();
  }, []);

  // Generate a random color
  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const handleAddCourse = async () => {};

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>My Courses</h1>
      <div style={styles.courses}>
        {courses.map((course) => (
          <div
            key={course.course_id}
            style={{
              ...styles.course,
              backgroundColor: course.bgColor, // Apply random color as background
            }}
          >
            <div style={styles.courseName}>{course.number}</div>
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
    overflowY: "auto",
    marginTop: "250px",
  },
  title: {
    fontSize: "24px",
    marginBottom: "20px",
  },
  courses: {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
    width: "100%",
  },
  course: {
    width: "200px",
    height: "300px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "8px",
    textAlign: "center",
    color: "white",
  },
  courseName: {
    fontSize: "18px",
    fontWeight: "bold",
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
    transition: "background-color 0.3s",
  },
};
export default CoursePage; */

import React from "react";
import { Link } from "react-router-dom";
import "./CoursePage.css";

const CoursePage = () => {
  const courses = [
    { id: 1, name: "Course 1" },
    { id: 2, name: "Course 2" },
    { id: 3, name: "Course 3" },
    { id: 4, name: "Course 4" },
    { id: 5, name: "Course 5" },
    // Add more courses as needed
  ];

  const handleAddCourse = () => {
    alert("Add Course button clicked!");
  };

  // Generate a random color
  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
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
            <div
              className="course"
              style={{ backgroundColor: getRandomColor() }}
            >
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
    maxWidth: "1000px",
    margin: "0 auto",
    marginTop: "230px",
  },
  title: {
    fontSize: "24px",
    marginBottom: "20px",
  },
  courses: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 200px)",
    gap: "20px",
    width: "100%",
    maxHeight: "60vh",
    overflowY: "auto",
    paddingRight: "10px",
  },
};
export default CoursePage;
