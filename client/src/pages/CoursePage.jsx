import React from "react";
import { Link } from "react-router-dom"; // Import Link for internal navigation

const CoursePage = () => {
  const courses = [
    { id: 1, name: "Course 1", imgSrc: "https://picsum.photos/id/237/200/301" },
    { id: 2, name: "Course 2", imgSrc: "https://picsum.photos/200/300" },
    { id: 3, name: "Course 3", imgSrc: "https://picsum.photos/id/257/200/300" },
    { id: 4, name: "Course 4", imgSrc: "https://picsum.photos/id/238/200/300" },
    { id: 5, name: "Course 5", imgSrc: "https://picsum.photos/id/239/200/300" },
    // Add more courses as needed
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
            style={styles.courseLink}
          >
            <div style={styles.course}>
              <img src={course.imgSrc} alt={course.name} style={styles.image} />
              <div style={styles.courseName}>{course.name}</div>
            </div>
          </Link>
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
  },
  courseLink: {
    textDecoration: "none", // Remove underline on link
    color: "inherit", // Keep text color consistent
  },
  course: {
    textAlign: "center",
  },
  image: {
    width: "100%",
    height: "auto",
    aspectRatio: "1",
    objectFit: "cover",
    borderRadius: "8px",
  },
  courseName: {
    marginTop: "10px",
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
    transition: "background-color 0.3s",
  },
};

export default CoursePage;
