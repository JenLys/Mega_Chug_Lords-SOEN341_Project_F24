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
import Login from "./pages/Login";
import UserView from "./pages/UserView";
import "./App.css";
import AuthProvider from "./components/AuthProvider";
import AddCourse from "./pages/AddCourse";

function App() {
  return (
    <AuthProvider>
      <div>
        <Navbar />
        <main>
          <Routes>
            <Route path="*" element={<Welcome />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<UserView />} />
            <Route path="/about" element={<About />} />
            <Route path="/how-to-use" element={<HowToUse />} />
            <Route path="/studentreg" element={<StudentRegistration />} />
            <Route path="/teacherreg" element={<TeacherRegistration />} />
            <Route path="/studentlogin" element={<StudentLogin />} />
            <Route path="/teacherlogin" element={<TeacherLogin />} />
            <Route path="/add-course" element={<AddCourse/>} />
          </Routes>
        </main>
      </div>
    </AuthProvider>
  );
}

export default App;
