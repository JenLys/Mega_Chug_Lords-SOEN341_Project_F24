import { useForm } from "react-hook-form";
import { useAuth } from "../AuthProvider";
import { request } from "../../utils";

export default function TeacherAddGroup({ handleClose, addNewGroup }) {
  const user = useAuth().storedUser;
  const {
    register,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    data["prof_id"] = user.user_id;
    await request("/courses/add-group", "POST", data)
      .then((res) => res.json())
      .then((res) => {
        if (res.message) {
          throw new Error(res.message);
        }
        return res;
      })
      .then((group) => {
        addNewGroup(group);
        handleClose('group');
      })
      .catch((err) => {
        setError("root.serverError", { message: err.message });
      });
  };

  return (
    <div className="w-full h-full flex align-center justify-center text-white">
      <div className="bg-black w-fit h-fit p-8 rounded-lg flex flex-col gap-4">
        <h2 className="text-center text-white text-3xl">Add a student to the group</h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-3 *:flex *:justify-between *:gap-6"
        >
          <div>
            <label>Student ID.</label>
            <input
              className="text-black"
              required
              type="text"
              placeholder="Enter the student's ID number"
              {...register("dept")}
            />
          </div>
          {errors.root?.serverError?.message && (
            <span className="text-red-500">
              {errors.root.serverError.message}
            </span>
          )}
          <input
            type="submit"
            className="text-m text-center border-solid border-white border-[3px] ease-in duration-50 p-1 rounded-lg hover:scale-110"
          />
        </form>
        <button
          className="text-m text-center border-solid border-white border-[3px] ease-in duration-50 p-1 rounded-lg hover:scale-110"
          onClick={(e) => {
            e.preventDefault();
            handleClose('group');
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
