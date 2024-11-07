import { Routes, Route } from "react-router-dom";
import Welcome from "./pages/Welcome";
import About from "./pages/About";
import HowToUse from "./pages/HowToUse";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import AuthProvider from "./components/AuthProvider";
import AddCourse from "./pages/AddCourse";
import Registration from "./pages/Registration";

function App() {
  return (
    <AuthProvider>
      <div className="w-screen h-screen flex flex-col bg-[#598DA4]/[0.47] font-display">
        <Navbar />
        <main className="w-full h-full flex flex-row items-center justify-center">
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/login" element={<Login />} />
            <Route path="/about" element={<About />} />
            <Route path="/how-to-use" element={<HowToUse />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/add-course" element={<AddCourse />} />
          </Routes>
        </main>
      </div>
    </AuthProvider>
  );
}

export default App;
