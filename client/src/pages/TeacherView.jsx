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


    return (
        <div>
        <h1 style={{fontSize: '40px', color: 'white', marginBottom: '20px'}}>Welcome Name, here are your courses!</h1>
        <br></br>
        
        <div style={{ display: 'flex', gap: '20px' }}>
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
                overflow: 'hidden',
                '--x-pos': '0px',
                '--y-pos': '0px',
            }}
            onMouseMove={(e) => {
                const rect = e.target.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                e.target.style.setProperty('--x-pos', `${x}px`);
                e.target.style.setProperty('--y-pos', `${y}px`);
              }}
            >
                
              {classItem.name}
              {/*fancy dégradé effect*/}
              {/*<div className="highlight-circle"></div> */}
            </div>
          </Link>
        ))}
      </div>
        
      </div>
      
    );
  }
  
  export default TeacherView;