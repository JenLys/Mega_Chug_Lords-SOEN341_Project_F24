import Input from "../Input";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useAuth } from "../AuthProvider";
import { Navigate } from "react-router-dom";

const TeacherLogin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const auth = useAuth();
  const [isLoggedIn, setIsLoggedIn] = useState(
    auth.isLoggedIn && auth.storedUser.role === "teacher"
  );
  const onSubmit = async (data) => {
    data.role = "teacher";
    await auth.loginAction(data).catch((res) => {} /* do nothing */);
    setIsLoggedIn(auth.isLoggedIn);
  };
  return isLoggedIn ? (
    <Navigate to="/" />
  ) : (
    <div className="bg-[#6681a8] rounded-lg p-5 flex flex-col align-middle gap-4 text-center">
      <h2 className="text-center text-white text-3xl">Teacher Login</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-3 *:flex *:justify-between *:gap-6"
      >
        <Input
          id="user_id"
          placeholder="Enter your Teacher ID"
          label="Teacher ID"
          register={register}
          validationRules={{
            required: { value: true, message: "ID cannot be left blank." },
            pattern: /^[0-9]{8}$/,
            minLength: { value: 8, message: "ID must be 8 characters long." },
            maxLength: { value: 8, message: "ID must be 8 characters long." },
          }}
        />
        {errors?.user_id?.message && <p>{errors.user_id.message}</p>}
        <Input
          id="pw"
          placeholder="Enter your password"
          label="Password"
          register={register}
          validationRules={{
            required: { value: true, message: "Password cannot be left blank" },
          }}
        />
        {errors?.pw?.message && <p>{errors.pw.message}</p>}
        <input
          type="submit"
          className="text-m text-center border-solid border-black border-[3px] ease-in duration-50 p-1 rounded-lg hover:invert hover:bg-white"
        />
      </form>
      <h3>
        Don't have an account?{" "}
        <a
          className="border-solid border-black border-[3px] ease-in duration-50 p-1 rounded-lg hover:invert hover:bg-white"
          href="/registration"
        >
          Create one here.
        </a>
      </h3>
    </div>
  );
};

export default TeacherLogin;
