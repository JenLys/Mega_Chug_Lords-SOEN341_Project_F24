import { useNavigate } from "react-router-dom";
import logo from "../assets/reviewmatelogo.jpg";
import { useAuth } from "./AuthProvider";
import { useEffect } from "react";

const Navbar = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const isLoggedIn = auth.isLoggedIn

  useEffect(() => {
  }, [isLoggedIn]);

  return (
    <nav className="w-full flex items-center justify-between p-6 bg-[#598da4b3] backdrop-filter-sm">
      <img
        src={logo}
        alt="ReviewMate Logo"
        className="size-[80px] object-contain"
      />
      <ul className="*:list-none *:inline-block *:ml-20 *:uppercase *:no-underline *:text-white *:text-2xl">
        <li>
          <a href="/">home</a>
        </li>
        <li>
          <a href="/about">about</a>
        </li>
        <li>
          <a href="/how-to-use">how to use</a>
        </li>
        {isLoggedIn ? (
          <a
            href=""
            onClick={(e) => {
              e.preventDefault();
              auth.logOut();
              navigate("/");
            }}
          >
            log out
          </a>
        ) : null}
      </ul>
    </nav>
  );
};

export default Navbar;
