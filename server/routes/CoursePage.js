// Assuming `studentRouter` is already defined
import Course from "../models/Course.js"; // Import the Course model

studentRouter.get("/courses", async (req, res) => {
  const { user_id } = req.query;

  if (!user_id) {
    return res
      .status(400)
      .json({ message: "User ID is required to fetch courses" });
  }

  try {
    // Fetch courses for the student by user_id, assuming user_id is a field in your student data
    const courses = await Course.find(
      { student_id: user_id },
      "course_id number"
    ); // Adjust field names as per your schema

    if (!courses || courses.length === 0) {
      return res
        .status(404)
        .json({ message: "No courses found for this student" });
    }

    // Format the courses for frontend display (e.g., with random color)
    const formattedCourses = courses.map((course) => ({
      id: course.course_id,
      name: `${course.number}`, // Customize as needed
      color: getRandomColor(), // Optional: Add color dynamically if desired
    }));

    res.status(200).json(formattedCourses);
  } catch (error) {
    console.error("Error fetching courses:", error);
    res.status(500).json({ message: "Error fetching courses" });
  }
});

// Optional: Utility function for random color assignment
const getRandomColor = () => {
  const colors = ["#FF5733", "#33FF57", "#3357FF", "#FF33A1", "#33FFA1"];
  return colors[Math.floor(Math.random() * colors.length)];
};
