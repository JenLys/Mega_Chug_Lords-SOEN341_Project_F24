import { useEffect, useState } from 'react';
import { request } from "../utils"
import { useAuth } from '../components/AuthProvider';

const AddCourse = () => {
  const user = useAuth().storedUser;
  const [courses, setCourses] = useState([])
  const [clickedCourses, setClickedCourses] = useState([]);

  useEffect(()=>{
    const getCourses = async (data) => {
      try {
        const response = await request("/all-courses", "GET", data);
        if (!response.ok) {
          throw new Error("Could not get courses");
        }
        const res = await response.json();
        setCourses(res);
      } catch (error) {
        console.error("Error:", error);
      }
    }
    getCourses();
  }, []);

  const handleClick = async (courseId) => {
    try {
      const response = await request("/student/enroll-course", "GET", {student_id: user.user_id, course_id: courseId});
      if (!response.ok) {
        throw new Error("Could not get courses");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div style={{ maxHeight: '400px', overflowY: 'scroll' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {courses.map((course, idx) => (
          <div
            key={idx}
            style={{ flex: '1 0 50%', boxSizing: 'border-box', padding: '10px' }}
          >
            <div style={{ border: '1px solid black', margin: '10px', padding: '10px' }}>
              <p>{course.dept} {course.number}</p>
              {!clickedCourses.includes(course._id) && (
                <button onClick={() => handleClick(course._id)}>Add Course</button>
              )}</div>
          </div>
        ))}
      </div>
    </div>
  )
};

export default AddCourse;