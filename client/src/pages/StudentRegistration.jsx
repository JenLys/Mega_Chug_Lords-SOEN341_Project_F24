import "./reg.css";
import Input from "../components/Input";
import { useState } from "react";
import { useForm } from "react-hook-form"
import { request } from "../utils";

const StudentRegistration = () => {
  const [isRegistered, setIsRegistered] = useState(false);

  const { 
    register,
    handleSubmit,
    formState: { errors } 
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await request("/student/register", "POST", data); 
      if (!response.ok) {
        throw new Error("Login failed. Please try again.");
      }
      setIsRegistered(true);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return isRegistered ?(
    <div>
      <p>Registered</p>
    </div>
    ): (
    <div className="wrapper">
      <h2>Student Registration</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          id="user_id"
          placeholder="Enter your Student ID"
          label="Student ID"
          register={register}
          validationRules={{
            required: true,
            pattern: /^[0-9]{8}$/,
            minLength: 8,
            maxLength: 8,
          }}
        />
        {errors.id && <p>Student ID field is required</p>}
        <Input
          id="fname"
          placeholder="Enter your first name"
          label="First Name"
          register={register}
          validationRules={{ required: true }}
        />
        {errors.fname && <p>First Name field is required</p>}
        <Input
          id="lname"
          placeholder="Enter your last name"
          label="Last Name"
          register={register}
          validationRules={{ required: true }}
        />
        {errors.lname && <p>Last Name field is required</p>}
        <Input
          id="pw"
          placeholder="Create password"
          label="Password"
          register={register}
          validationRules={{ required: true }}
        />
        {errors.pwd && <p>Password field is required</p>}
        <div className="input-box button">
          <input type="submit" />
        </div>
      </form>
      <div className="text">
        <h3>
          Creating a <a href="/teacherreg">teacher account</a> instead?
        </h3>
      </div>
      <div className="text">
        <h3>
          Already have an account? <a href="/studentlogin">Login now.</a>
        </h3>
      </div>
    </div>
  );
};

export default StudentRegistration;
