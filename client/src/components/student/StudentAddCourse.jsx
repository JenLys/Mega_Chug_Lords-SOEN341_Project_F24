import { useEffect, useState } from "react";
import { request } from "../../utils";
import { useAuth } from "../AuthProvider";
import { useForm } from "react-hook-form";

const StudentAddCourse = ({ handleClose, addNewCourse }) => {
  const user = useAuth().storedUser;
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState();
  const {
    register,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const getCourses = async () => {
      try {
        const response = await request(
          "/student/all-courses-not-enrolled",
          "POST",
          {
            user_id: user.user_id,
          }
        );
        if (!response.ok) {
          throw new Error("Could not get courses");
        }
        const res = await response.json();
        if (res.length > 0) setSelectedCourse(res[0].course);
        setCourses(res);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    getCourses();
  }, []);

  const onSubmit = async () => {
    await request("/student/enroll-course", "POST", {
      course_id: selectedCourse._id,
      student_id: user.user_id,
    })
      .then((res) => {
        if (!res.ok) {
          console.log("Res", res);
          throw new Error("Couldn't enroll student");
        }
        return res;
      })
      .then(res => res.json())
      .then(data => {
        addNewCourse(data);
        handleClose();
      }
      )
      .catch((e) => {
        console.error(e);
      });
  };

  return (
    <div className="flex align-center justify-center text-white">
      <div className="bg-black w-fit text-white flex flex-col gap-4 p-4 rounded-xl">
        <h2 className="text-center text-white text-3xl">Enroll in a course</h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-3 *:flex *:justify-between *:gap-6"
        >
          <div className="flex gap-4">
            <label>Choose a course</label>
            <select
              id="course_id"
              className="text-black"
              defaultValue={selectedCourse}
              onChange={(e) => {
                e.preventDefault();
                setSelectedCourse(courses[e.target.value].course);
              }}
            >
              {courses.map((course, idx) => (
                <option key={idx} value={courses.indexOf(course)}>
                  {course.course.dept} {course.course.number} -
                  {course.teacher.fname} {course.teacher.lname}
                </option>
              ))}
            </select>
          </div>
          <input
            type="submit"
            className="text-m w-fit self-center text-center border-solid border-white border-[3px] ease-in duration-50 p-1 rounded-lg hover:scale-110"
          />
        </form>
        <button
          onClick={(e) => {
            e.preventDefault();
            handleClose();
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default StudentAddCourse;
