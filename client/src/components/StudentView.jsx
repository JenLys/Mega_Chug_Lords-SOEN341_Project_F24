import { useEffect, useState } from "react";
import { request } from "../utils";
import { useNavigate } from 'react-router-dom';

const StudentView = ({user}) => {
  const [courses, setCourses] = useState([])
  const navigate = useNavigate();

  useEffect(()=>{
    const getCourses = async (data) => {
      try {
        const response = await request("/student/courses", "GET", data);
        if (!response.ok) {
          throw new Error("Could not get courses");
        }
        const res = await response.json();
        setCourses(res);
      } catch (error) {
        console.error("Error:", error);
      }
    }
    getCourses({student_id: user.user_id});
  }, [user.user_id]);

  const handleAddCourse = () => {
    navigate('/add-course'); // Navigate to the add course page
  };
  
  return(
    <div>
      <div style={{ maxHeight: '400px', overflowY: 'scroll' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {courses.map((course, idx) => (
            <div key={idx} style={{ flex: '1 0 50%', boxSizing: 'border-box', padding: '10px' }}>
              <div style={{ border: '1px solid black', margin: '10px', padding: '10px' }}>
                <p> {course.dept} {course.number}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <button onClick={handleAddCourse}>Add Course</button>
    </div>
    
  );
};

export default StudentView;