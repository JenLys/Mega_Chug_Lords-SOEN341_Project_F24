import { useContext, createContext, useState } from "react";
import { request } from "../utils";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [storedUser, setStoredUser] = useState(
    JSON.parse(localStorage.getItem("user")) || ""
  );
  const [user, setUser] = useState(storedUser);
  const [isLoggedIn, setIsLoggedIn] = useState(storedUser != "")
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
              return Promise.reject({message: "Invalid login information"})
            }
          })
          .then((data) => {
            localStorage.setItem("user", JSON.stringify(data));
            setStoredUser(JSON.parse(localStorage.getItem("user")));
            setIsLoggedIn(true);
            setUser(data);
          });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const logOut = () => {
    setUser(null);
    setStoredUser("");
    localStorage.removeItem("user");
    setIsLoggedIn(false)
  };

  return (
    <AuthContext.Provider
      value={{ storedUser: storedUser, isLoggedIn: isLoggedIn, user, loginAction, logOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
