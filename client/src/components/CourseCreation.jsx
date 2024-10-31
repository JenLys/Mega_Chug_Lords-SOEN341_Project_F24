import { useState } from 'react';
import ReactDOM from 'react-dom/client';
import "../pages/reg.css";

function CreateCourse() {
    const [courseId, setCourseId] = useState("");
    const [number, setNumber] = useState("");
    const [dept, setDept] = useState("");
    const [user_id, setUserId] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
    }
    //Form for course creation: includes inputs for the course id, course number, department, and the user id of the teacher
    return(
        <form onSubmit={handleSubmit}>
                <div className='form-box'>
                <label>
                    Course Id: 
                    <input 
                    type="text" 
                    value={courseId}
                    onChange={(e) => setCourseId(e.target.value)}
                    />
                </label>
                <br></br>
                <label>
                    Course Number: 
                    <input type="text" 
                    value={number}
                    onChange={(e) => setNumber(e.target.value)} 
                    />
                </label>
                <br></br>
                <label>
                    Department: 
                    <input type="text"
                    value={dept}
                    onChange={(e) => setDept(e.target.value)}
                    />
                </label>
                <br></br>
                <label>
                    User Id: 
                    <input type="text" 
                    name="user_id" 
                    value={user_id}
                    onChange={(e) => setUserId(e.target.value)}
                    />
                </label>
               
               <br></br>
                <button className="input-box button" type="submit">Submit</button>
                </div>
            </form>
        )
    }

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<CreateCourse />);
export default CreateCourse;