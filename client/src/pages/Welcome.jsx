import React from 'react';
import './styles.css';

const Welcome = () => {
  return (
    <div className="page">
      <video autoplay loop muted playsInline className="vid">
        <source src="/static/video.mp4" type="video/mp4" />
      </video>

      <nav>
        <img src="/static/reviewmatelogo.jpg" className="logo" alt="ReviewMate Logo" />
        <ul>
          <li><a href="#" className="nav-link">ABOUT</a></li>
          <li><a href="#" className="nav-link">HOW TO USE</a></li>
        </ul>
      </nav>

      <div className="content">
        <h1>ReviewMate</h1>
        <div className="button-container">
          <button className="button">Login as a Teacher</button>
          <button className="button">Login as a Student</button>
        </div>

        <p className="create-link"><a href="#" className="link">Don't have an account? Create one</a></p>
      </div>
    </div>
  );
};

export default Welcome;