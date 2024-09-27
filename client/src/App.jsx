import "./App.css";
import { Routes, Route } from "react-router-dom";
import StudentRegistration from "./components/studentregistration";
import TeacherRegistration from "./components/TeacherRegistration";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<div>This is the app</div>} />
        <Route path="/studentreg" element={<StudentRegistration />} />
        <Route path="/teacherreg" element={<TeacherRegistration />} />
        {/* <Route path="*" element={<div>404 Not Found</div>} /> */}
      </Routes>
    </div>
  );
}

export default App;
