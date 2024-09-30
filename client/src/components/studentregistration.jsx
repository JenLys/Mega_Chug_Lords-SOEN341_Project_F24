// src/components/StudentRegistration.js
import React from "react";
import "./reg.css";

const handleSubmit = async (e) => {
  e.preventDefault();

  if (
    data.studentId != null &&
    data.firstname != null &&
    data.lastname != null &&
    data.password != null
  ) {
    // Ensure none of the input fields are empty
    if (
      data.studentId.trim() !== "" &&
      data.firstname.trim() !== "" &&
      data.lastname.trim() !== "" &&
      data.password.trim() !== ""
    ) {
      const response = await fetch("/studentreg", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
    } else {
      console.error("One or more fields are empty");
    }
  } else {
    console.error("One or more fields are null");
  }

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
        <div className="input-box">
          <label htmlFor="studentid">Student ID:</label>
          <input
            type="number"
            id="studentid"
            placeholder="Enter your Student ID"
            required
          />
        </div>
        <div className="input-box">
          <label htmlFor="firstname">First name:</label>
          <input
            type="text"
            id="firstname"
            placeholder="Enter your First name"
            required
          />
        </div>
        <div className="input-box">
          <label htmlFor="lastname">Last name:</label>
          <input
            type="text"
            id="lastname"
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
