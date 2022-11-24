import React, {useContext} from 'react'
import CourseContext from '../context/CourseContext';
import { useNavigate } from 'react-router-dom';

const CourseStructure = (props) => {
    const context = useContext(CourseContext);
    const {course, setCourse} = context;
    const navigate = useNavigate();

    const launchCourse = ()=>{
        const courseID = props.course._id;
        // console.log("Launch course wih id: ", courseID);
        setCourse(courseID);
        navigate('/course/videos');
        
    }

  return (
    
        <div  className="card bg-light mb-5 rounded-4" id={`${props.course._id}`} style={{width: "20rem", border: "1px solid", display:"inline-block", padding: "20px", margin: "50px", backgroundColor: "#CFF5E7", fontFamily: "Montserrat"}}>
            {/* <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTY-1IC8C9PRC45b_SUwrxwJWp1VitPNcEjFA&usqp=CAU" className="card-img-top" alt="..."/> */}
            <div className="card-body">
                <p className="card-title" style={{textAlign: "center", fontSize: "30px"}}> <b> {props.course.name}</b></p>
                <p className="card-text"><i>{props.course.description}</i></p>
                <p className="card-text"><b>Total videos: </b>{props.course.totalVideos}</p>

                <div className="btn-toolbar">
                    {/* <button type="button" id="btnSubmit" onClick={()=>{reviewArea(area)}} className="btn btn-primary btn-sm mx-3">Review</button> */}
                    <button type="button" id="launchcourse" onClick={launchCourse} className="btn btn-primary btn-sm mx-3">Launch course</button>
                    {/* <button type="button" onClick={seeReviews} className="btn btn-primary btn-sm mx-3 my-3 mx-auto">See reviews</button> */}
                </div>
            </div>
        </div>
  )
}

export default CourseStructure