import { useState } from 'react';
import ReactDOM from 'react-dom/client';
import "./reg.css";

function CreateCourse() {
    const [className, setClassName] = useState("");
    const [courseCode, setCourseCode] = useState("");
    const [maxParticipants, setMaxParticipants] = useState("");
    const [selectedSemester, setSelectedSemester] = useState("fall");

    const handleSubmit = (event) => {
        event.preventDefault();
      }
    return(
        <form onSubmit={handleSubmit}>
                {/*Specific length for title, requirements for course code, max participants (make sure the number is higher than 1), semester offered dropdown? */}
                <div className='form-box'>
                <label>
                    Course title: 
                    <input 
                    type="text" 
                    value={className}
                    onChange={(e) => setClassName(e.target.value)}
                    />
                </label>
                <br></br>
                <label>
                    Course code: 
                    <input type="text" 
                    value={courseCode}
                    onChange={(e) => setCourseCode(e.target.value)} 
                    />
                </label>
                <br></br>
                <label>
                    Maximum participants: 
                    <input type="number" min="1" max="600"
                    value={maxParticipants}
                    onChange={(e) => setMaxParticipants(e.target.value)}
                    />
                </label>
                <br></br>
                <label>
                    Semester offered: 
                    <select 
                    name="selectedSemester" 
                    id="selectedSemester"
                    value={selectedSemester}
                    onChange={(e) => setSelectedSemester(e.target.value)}>
                        <option value="fall">Fall</option>
                        <option value="winter">Winter</option>
                        <option value="summer">Summer</option>
                    </select>
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