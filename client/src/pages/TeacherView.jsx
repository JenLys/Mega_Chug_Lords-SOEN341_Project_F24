import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import {useLocation} from "react-router-dom";

import "./teacher.css"
function TeacherView() {
    /*For the rendering on the same page */
    const [selectedCourse, setSelectedCourse] = useState(null);
    const location = useLocation();
    /*Defining the classes- for now it's hardcoded, will have to connect to the db*/ 
    const classes=[
        {name:"SOEN 341", path:'/class/soen-341'},
        {name:"ELEC 275", path:'/class/elec-275'},
        {name:"COMP 123", path: '/class/comp-123'},
        {name: "ENGR 232", path: '/class/engr-232'}
    ];

    const handleMouseMove = (e) => {
        const box = e.currentTarget;
        const rect = box.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        box.style.setProperty('--x', `${x}px`);
        box.style.setProperty('--y', `${y}px`);
      };
    
      const handleMouseLeave = (e) => {
        const box = e.currentTarget;
        box.style.setProperty('--x', `-9999px`);
        box.style.setProperty('--y', `-9999px`);
      };

      /*When the course is clicked, a new layout will appear where its name will be displayed */
      const handleClick = (course) => {
      setSelectedCourse(course.name); // Set the clicked course name
      };


      return (
        <div>
          {selectedCourse ? (
            <div>
              <h1 style={{ fontSize: "40px", color: "white", marginBottom: "20px" }}>
                {selectedCourse} {/*Display the name of the course that got accessed */}
              </h1>
              <Link to={location.pathname}>
                
                <button
                  style={{
                    padding: "10px 20px",
                    fontSize: "16px",
                    borderRadius: "5px",
                    backgroundColor: "white",
                    border: "none",
                    cursor: "pointer"
                  }}
                  onClick={() => setSelectedCourse(null)}
                >
                  Back to Courses {/*offer a way back to the view of all courses--just in case */}
                </button>
              </Link>
            </div>
          ) :
          /*This is what the user sees when no course is clicked */ (
            <div>
              <h1 style={{ fontSize: "40px", color: "white", marginBottom: "20px" }}>
                Welcome Name, here are your courses!
              </h1>
              <br />
              <div style={{ display: "flex", gap: "20px" }}>
                {classes.map((classItem, index) => (
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
                    onClick={() => handleClick(classItem)}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                  >
                    <span>{classItem.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      );
    }
  
  export default TeacherView;