// src/components/StudentRegistration.js
import React from "react";
import "./reg.css";

const handleSubmit = async (e) => {
  e.preventDefault();

  const data = {
    studentId: document.getElementById("student-id").value,
    firstname: document.getElementById("firstname").value,
    lastname: document.getElementById("lastname").value,
    password: document.getElementById("password").value,
  };

  const response = await fetch("/studentreg", {
    // Change to "/studentreg"
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();
  console.log(result);
};

const StudentRegistration = () => {
  return (
    <div className="wrapper">
      <h2>Student Account</h2>
      <form onSubmit={handleSubmit}>
        {" "}
        {/* Update form to call handleSubmit */}
        <div className="input-box">
          <label htmlFor="student-id">Student ID:</label>
          <input
            type="number"
            id="student-id"
            placeholder="Enter your Student ID"
            required
          />
        </div>
        <div className="input-box">
          <label htmlFor="firstname">First name:</label>
          <input
            type="text"
            id="username"
            placeholder="Enter your First name"
            required
          />
        </div>
        <div className="input-box">
          <label htmlFor="lastname">Last name:</label>
          <input
            type="text"
            id="username"
            placeholder="Enter your last name"
            required
          />
        </div>
        <div className="input-box">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            placeholder="Create password"
            required
          />
        </div>
        <div className="policy">
          <input type="checkbox" />
          <h3>I accept all terms & conditions</h3>
        </div>
        <div className="input-box button">
          <input type="submit" value="Register Now" />
        </div>
        <div className="text">
          <h3>
            Already have an account? <a href="#">Login now</a>
          </h3>
        </div>
        <div className="text">
          <h3>
            Creating teacher account? <a href="/teacherreg">Teacher account</a>
          </h3>
        </div>
      </form>
    </div>
  );
};

export default StudentRegistration;
