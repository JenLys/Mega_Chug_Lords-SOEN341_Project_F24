import { Navigate } from "react-router-dom"
import { useAuth } from "../components/AuthProvider"

export default function Login(){
  const auth = useAuth()
  if(auth.storedUser) return <Navigate to={"/profile"}/>
  return (
    <div>
      login page
    </div>
  )
}