import { useContext, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { request } from "../utils";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [storedUser, setStoredUser] = useState(
    JSON.parse(localStorage.getItem("user")) || ""
  );
  const navigate = useNavigate();
  const loginAction = async (data) => {
    try {
      if (
        data &&
        data.user_id != null &&
        data.pw != null &&
        data.role != null
      ) {
        await request(`/${data.role}/login`, "POST", data)
          .then((res) => {
            if (res.ok) {
              return res.json();
            } else {
              throw new Error(
                `Status: ${res.status}, ${res.statusText}, ${res}`
              );
            }
          })
          .then((data) => {
            setUser(data);
            localStorage.setItem("user", JSON.stringify(data));
            navigate("/profile");
          });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const logOut = () => {
    setUser(null);
    setStoredUser("");
    localStorage.removeItem("site");
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{ storedUser: storedUser, user, loginAction, logOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
