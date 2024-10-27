import React from "react";

const CoursePage = () => {
  const courses = [
    { id: 1, name: "Course 1", imgSrc: "https://picsum.photos/id/237/200/301" },
    { id: 2, name: "Course 2", imgSrc: "https://picsum.photos/200/300" },
    { id: 3, name: "Course 3", imgSrc: "https://picsum.photos/id/257/200/300" },
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
          <div key={course.id} style={styles.course}>
            <img src={course.imgSrc} alt={course.name} style={styles.image} />
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
    marginTop: "230px", // Adjust based on your Navbar height
  },
  title: {
    fontSize: "24px",
    marginBottom: "20px",
  },
  courses: {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
    justifyContent: "flex-start",
    width: "100%",
  },
  course: {
    width: "150px",
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
    ":hover": {
      backgroundColor: "#0056b3", // Darker blue on hover
    },
  },
};

export default CoursePage;
