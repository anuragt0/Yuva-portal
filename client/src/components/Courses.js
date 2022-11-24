import React, { useEffect ,useContext} from 'react';
import { useState } from 'react';
import CourseStructure from './CourseStructure';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import courseContext from '../context/CourseContext';

const Courses = () => {
    const host = 'http://localhost:5000';
    const [courses, setCourses] = useState([]);
    const context = useContext(courseContext);
    const {fromLogin, setFromLogin} = context;
    useEffect(() => {
        // console.log("I fire once");
        if(fromLogin){
            setFromLogin(false);
            toast.success("Logged in successfully", {
                position: 'top-center',
                autoClose: 2000
            });
        }
        fetch(`${host}/api/getcourses`, {
            method: 'GET', 
            headers: {
                'Content-Type': 'application/json',
            },
            })
            .then((response) => response.json())
            .then((dataa) => {
                console.log("Got the courses: ");
                console.log(dataa);
                setCourses(dataa);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    
    }, [])
    
  return (
        <>
            <h1 style={{padding: "30px",  fontFamily: "Montserrat"}}>Available courses-</h1>

            <div className="row">
            {

                courses.map((course)=>{
                    return <CourseStructure key = {course._id} course={course}/>
                })
            }
            </div>
    <ToastContainer/>


        </>
  )
}

export default Courses
