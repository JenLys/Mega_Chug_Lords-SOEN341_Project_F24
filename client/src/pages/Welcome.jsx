import './styles.css';
import video from '../assets/video.webm'
import {useAuth} from '../components/AuthProvider';
import StudentView from '../components/StudentView';

function Welcome() {
  const user = useAuth().storedUser
  if(user.role === "teacher"){
    return (
      <></>
    )
  } else if(user.role === "student"){
    return (
      <StudentView user={user}/>
    )
  }else{
    return (
      <div className="page">
        
        <div className="vid">
        <video src={video} type="video/webm" atl="background video" autoPlay loop muted/>
        </div>
        
        <div className="content">
          <h1>ReviewMate</h1>
          <div className="button-container">
            <button className="button"><a href="/teacherlogin">Login as a Teacher</a></button>
            <button className="button"><a href="/studentlogin">Login as a Student</a></button>
          </div>
  
          <p className="create-link"><a href="/studentreg" className="link">Don't have an account? Create one</a></p>
        </div>
      </div>
    );
  }
  
}

export default Welcome;