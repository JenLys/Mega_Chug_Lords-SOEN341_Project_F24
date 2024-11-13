import { Routes, Route } from "react-router-dom";
// import { BrowserRouter as Routes, Route } from 'react-router-dom';
import Welcome from "./pages/Welcome";
import About from "./pages/About";
import HowToUse from "./pages/HowToUse";
import Navbar from "./components/Navbar";
import StudentRegistration from "./pages/StudentRegistration";
import TeacherRegistration from "./pages/TeacherRegistration";
import StudentLogin from "./pages/StudentLogin";
import TeacherLogin from "./pages/TeacherLogin";
import "./App.css";
import CoursePage from "./pages/course/StudentCourseView";

function App() {
  return (
    <div>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/about" element={<About />} />
          <Route path="/how-to-use" element={<HowToUse />} />
          <Route path="/studentreg" element={<StudentRegistration />} />
          <Route path="/teacherreg" element={<TeacherRegistration />} />
          <Route path="/studentlogin" element={<StudentLogin />} />
          <Route path="/teacherlogin" element={<TeacherLogin />} />
          <Route path="/student/courses" element={<CoursePage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
