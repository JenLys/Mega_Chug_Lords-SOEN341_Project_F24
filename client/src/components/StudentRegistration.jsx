import Input from "./Input";
import { useForm } from "react-hook-form";
import { request } from "../utils";
import { useNavigate } from "react-router-dom";

const StudentRegistration = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await request("/student/register", "POST", data);
      if (!response.ok) {
        throw new Error("Login failed. Please try again.");
      }
      navigate("/login");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="bg-[#6681a8] rounded-lg p-5 flex flex-col align-middle gap-4 text-center">
      <h2 className="text-center text-white text-3xl">Student Registration</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-3 *:flex *:justify-between *:gap-6"
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
        <input
          type="submit"
          className="text-m text-center border-solid border-black border-[3px] ease-in duration-50 p-1 rounded-lg hover:invert hover:bg-white"
        />
      </form>
      <h3>
        Creating a{" "}
        <a
          className="border-solid border-black border-[3px] ease-in duration-50 p-1 rounded-lg hover:invert hover:bg-white"
          href="/registration"
        >
          teacher account
        </a>{" "}
        instead?
      </h3>
      <h3>
        Already have an account?{" "}
        <a
          className="border-solid border-black border-[3px] ease-in duration-50 p-1 rounded-lg hover:invert hover:bg-white"
          href="/login"
        >
          Login now.
        </a>
      </h3>
    </div>
  );
};

export default StudentRegistration;
