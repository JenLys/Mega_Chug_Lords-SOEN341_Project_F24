import "./reg.css";
import Input from "../components/Input";
import { Form, useForm } from "react-hook-form";

const StudentLogin = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useForm();
  return (
    <div className="wrapper">
      <h2>Student Login</h2>
      <Form
        action="/api/login/student"
        method="post"
        encType={"application/json"}
        control={control}
      >
        <Input
          id="id" 
          placeholder="Enter your Student ID"
          label="Student ID" 
          register={register} 
          validationRules={{ 
            required : {value:true, message:"ID cannot be left blank."},
            pattern: /^[0-9]{8}$/, 
            minLength: {value:8, message:"ID must be 8 characters long."},
            maxLength: {value:8, message:"ID must be 8 characters long."}
          }} 
        />
        {errors?.id?.message && <p>{errors.id.message}</p>}
        <Input 
          id="pwd" 
          placeholder="Enter your password" 
          label="Password" 
          register={register} 
          validationRules={{ required : true, }} 
        />
        {errors?.pwd?.message && <p>{errors.id.message}</p>}
        <div className="input-box button">
          <input type="submit" />
        </div>
      </Form>
      <div className="text">
          <h3>
            Don't have an account? <a href="/register/student">Create one here.</a>
          </h3>
      </div>
    </div>
  );
};

export default StudentLogin;
