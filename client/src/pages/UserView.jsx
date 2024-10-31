import { Navigate } from "react-router-dom";
import { useAuth } from "../components/AuthProvider";

export default function UserView() {
  const auth = useAuth();
  if (!auth.storedUser) return <Navigate to="/login" />;
  const user = auth.storedUser;
  const fullname = user.fname + " " + user.lname;
  return <div>Hello {fullname}</div>;
}
