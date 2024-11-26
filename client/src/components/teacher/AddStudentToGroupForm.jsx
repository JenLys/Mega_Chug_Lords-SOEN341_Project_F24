import { useForm } from "react-hook-form";

export default function AddStudentToGroupForm({ handleAddStudent, groupId, groupIndex}) {
  const { register, handleSubmit } = useForm();

  return (
    <form onSubmit={handleSubmit((data) => handleAddStudent(data, groupId, groupIndex))}>
      <input
        className="max-w-full"
        type="text"
        placeholder="Enter a Student ID"
        {...register("student_id", {
          required: true,
        })}
      />
      <input type="submit" value="Add Student" />
    </form>
  );
}
