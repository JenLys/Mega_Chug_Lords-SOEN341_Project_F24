import { useState } from 'react';
import ReactDOM from 'react-dom/client';
import "./reg.css";



function CreateCourse() {
    const handleSubmit = (event) => {
        event.preventDefault();
      }
    return(
        <form onSubmit={handleSubmit}>
                {/*Specific length for title, requirements for course code, max participants (make sure the number is higher than 1), semester offered dropdown? */}
                <div className='form-box'>
                <label>
                    Course title: 
                    <input type="text" />
                </label>
                <br></br>
                <label>
                    Course code: 
                    <input type="text"/>
                </label>
                <br></br>
                <label>
                    Maximum participants: 
                    <input type="number" min="1" max="600"/>
                </label>
                <br></br>
                <label>
                    Semester offered: 
                    <select name="selectedSemester" id="selectedSemester">
                        <option value="fall">Fall</option>
                        <option value="winter">Winter</option>
                        <option value="summer">Summer</option>
                    </select>
                </label>
               
               <br></br>
                <button className="input-box button" input="submit">Submit</button>
                </div>
                
            </form>
            )
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<CreateCourse />);
export default CreateCourse;