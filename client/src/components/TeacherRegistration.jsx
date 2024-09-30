import React from "react";

const handleSubmit = async (e) => {
  e.preventDefault();

  // const data = {
  //   e.target.
  //   username: document.getElementById("username").value,
  //   password: document.getElementById("password").value,
  // };

  if (
    data.teacherid != null &&
    data.firstname != null &&
    data.lastname != null &&
    data.password != null
  ) {
    // Ensure none of the input fields are empty
    if (
      data.teacherid.trim() !== "" &&
      data.firstname.trim() !== "" &&
      data.lastname.trim() !== "" &&
      data.password.trim() !== ""
    ) {
      const response = await fetch("/teacherreg", {
        // Change to "/teacherreg"
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

  const response = await fetch("/teacherreg", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();
  console.log(result);
};

const TeacherRegistration = () => {
  return (
    <div className="wrapper">
      <h2>Teacher Account</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-box">
          <label htmlFor="teacherid">Teacher ID:</label>
          <input
            type="number"
            id="teacherid"
            placeholder="Enter your Teacher ID"
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
        <div className="input-box button">
          <input type="submit" value="Register Now" />
        </div>
        <div className="text">
          <h3>
            Already have an account? <a href="#">Login now</a>
          </h3>
        </div>
      </form>
    </div>
  );
};

export default TeacherRegistration;
