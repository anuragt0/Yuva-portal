import React from 'react'
import { useEffect } from 'react';
import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import courseContext from '../context/CourseContext';
import { useContext } from 'react';

const AdminCourses = () => {
    const [courses, setCourses] = useState([]);
    const [newCourse, setNewCourse] = useState({name: "", description: ""});
    const [dltCourse, setDltCourse] = useState({});
    const navigate = useNavigate();

    const context = useContext(courseContext);
    const {adminCourse, setAdminCourse} = context;

    // for adding area
    const ref = useRef(null);
    const refClose = useRef(null);

    // for delete
    const ref2 = useRef(null);
    const refClose2 = useRef(null);   
     const [videos, setVideos] = useState([]);

      
        
    
    useEffect(() => {
        fetch(`http://localhost:5000/api/getcourses`, {
            method: 'GET', 
            headers: {
                'Content-Type': 'application/json',
            },
            })
            .then((response) => response.json())
            .then((dataa) => {
                setCourses(dataa);
                console.log("courses: ", dataa);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    
    }, [])
    const handleNewCourse = ()=>{
        console.log("Add new course");
        ref.current.click();
    }
    
    const handleDelete = (course)=>{
        console.log("To delete: ", course._id);
        setDltCourse(course);
        ref2.current.click();
    }

    const handleGetVideos = (course)=>{
        console.log("Give all videos", course);
        setAdminCourse(course._id);
        console.log("yoyoyo: ", course._id);
        navigate('/admin/courses/videos');

    }

    const onChange = (e)=>{
        setNewCourse({...newCourse, [e.target.name]: e.target.value})
    }

    const handleAddCourse = (e)=>{
        e.preventDefault();
        console.log("Adding new Course");
        console.log(newCourse);

        //Validate the input fields ....

        fetch(`http://localhost:5000/api/auth/uploadcourse`, {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify(newCourse),
        })
        .then((response) => response.json())
        .then((data) => {
            console.log("here: ", data);
            // alert("Adding the new area")
        })
        .catch((error) => {
            console.error('Error:', error);
        });
        refClose.current.click();
        window.location.reload();
    }

    const handleDltConfirm = (e)=>{
        e.preventDefault();
        fetch(`http://localhost:5000/api/auth/deletecourse`, {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({courseID: dltCourse._id}),
        })
        .then((response) => response.json())
        .then((data) => {
            console.log("here: ", data);
            // alert("Adding the new area")
        })
        .catch((error) => {
            console.error('Error:', error);
        });
        refClose2.current.click();
        window.location.reload();
    }
    
  return (
    <>

    <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal2"
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal2"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Add a new course
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
            <div className="modal-body">
              {/* Form */}
              <form className="my-3">
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    minLength={3}
                    onChange={onChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="description"
                    name="description"
                    onChange={onChange}
                    minLength={5}
                    required
                  />
                </div>
                
                
              </form>
            </div>
            <div className="modal-footer">
              <button 
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref = {refClose}
              >
                Close
              </button>
              <button
                onClick={handleAddCourse}
                type="button"
                className="btn btn-primary"
              >
                Add course
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for deleting course */}
      <button
        ref={ref2}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title" id="exampleModalLabel" style={{"color": "red"}}>
                <b>Confirm Delete</b> 
              </h4>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
            <div className="modal-body">
              <h5>Name: {dltCourse.name}</h5>
              <h5>Description: {dltCourse.description}</h5>
              
            </div>
            <div className="modal-footer">
              <button 
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref = {refClose2}
              >
                Close
              </button>
              <button
                onClick={handleDltConfirm}
                type="button"
                className="btn btn-danger"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>

    <div style={{backgroundImage: "url(`background.jpg`)"}}>
    <h1 className='my-5'>Available Courses: </h1>
    <div className="text-center my-5">
        <button type="button" class="btn btn-primary btn-lg mx-3" onClick={()=>handleNewCourse()}>Add a new Course</button>
    </div>
    <div style={{overflowX : 'auto'}}>

    <table className="table table-hover ">
<thead>
<tr>
  <th scope="col">Course Name</th>
  <th scope="col">Description</th>
  <th scope="col">Created By</th>
  <th scope="col">Total videos</th>
</tr>
</thead>
<tbody>
{
    courses.map((course)=>{
        
        return(<tr key={course._id}>
            <td>{course.name}</td>
            <td>{course.description}</td>
            <td>{course.createdBy!=null?course.createdBy:"Not available"}</td>
            <td>{course.totalVideos}</td>
            
            <td><button className='btn btn-primary' onClick={()=>handleGetVideos(course)}>Videos</button></td>
            <td><button className='btn btn-danger' onClick={()=>handleDelete(course)}>Delete course</button></td>
        </tr>)
    })
}


</tbody>
</table>
</div>


</div>
</>
  )
}

export default AdminCourses