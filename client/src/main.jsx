import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App";
import Welcome from "./pages/Welcome";
import About from "./pages/About";
import HowToUse from "./pages/HowToUse";
import StudentRegistration from "./pages/StudentRegistration";
import TeacherRegistration from "./pages/TeacherRegistration";
import StudentLogin from "./pages/StudentLogin";
import TeacherLogin from "./pages/TeacherLogin";
import CoursePage from "./pages/course/StudentCourseView";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/studentreg",
        element: <StudentRegistration />,
      },
      {
        path: "/teacherreg",
        element: <TeacherRegistration />,
      },
      {
        path: "/studentlogin",
        element: <StudentLogin />,
      },
      {
        path: "/teacherlogin",
        element: <TeacherLogin />,
      },
      {
        path: "/",
        element: <Welcome />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/how-to-use",
        element: <HowToUse />,
      },
      {
        path: "/student/courses",
        element: <CoursePage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
