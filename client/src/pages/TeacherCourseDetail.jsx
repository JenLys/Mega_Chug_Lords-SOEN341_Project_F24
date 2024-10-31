import React, { useState, useEffect } from 'react';
import { request } from "../utils"


const TeacherCourseDetail = ({course}) => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const getUsers =  async (data) => {
      console.log(data)
      try {
        const response = await request("/teacher/courseDetails", "GET", data);
        if (!response.ok) {
          throw new Error("Could not get course detail");
        }
        const res =  await response.json();
        setStudents(res.students);
        console.log(res.students);
      } catch (error) {
        console.error("Error:", error);
        
      }
    }
    getUsers({course_id : course.course_id});
  }, [course.course_id]);
  
  return (
    <div style={{ maxHeight: '400px', overflowY: 'scroll' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {students.map((student, idx) => (
          <div key={idx} style={{ flex: '1 0 50%', boxSizing: 'border-box', padding: '10px' }}>
            <div style={{ border: '1px solid black', margin: '10px', padding: '10px' }}>
              <p>Name: {student.fname} {student.lname}</p>
              <p>ID: {student.user_id}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeacherCourseDetail;