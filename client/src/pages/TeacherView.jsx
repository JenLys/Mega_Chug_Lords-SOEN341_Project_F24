import React from "react";
import { Link } from "react-router-dom";

import "./teacher.css"
function TeacherView() {
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


    return (
        <div>
        <h1 style={{fontSize: '40px', color: 'white', marginBottom: '20px'}}>Welcome Name, here are your courses!</h1>
        <br></br>
        
        <div style={{ display: 'flex', gap: '20px'}}>
        {classes.map((classItem, index) => (
          <Link to={classItem.path} key={index} style={{ textDecoration: 'none' }}>
            <div
             className = "class-box"
              style={{
                width: '150px',
                height: '100px',
                backgroundColor: 'transparent',
                border: '3px solid white',
                borderRadius: 7,
                textAlign: 'center',
                lineHeight: '100px',
                fontSize: '18px',
                color: 'white',
                position: 'relative',
              }}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
            >
              <span>{classItem.name}</span>
             
            </div>
          </Link>
        ))}
      </div>
        
      </div>
      
    );
  }
  
  export default TeacherView;