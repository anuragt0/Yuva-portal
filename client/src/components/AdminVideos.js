import { useEffect } from 'react';
import { useState, useRef } from 'react';
import {React, useContext} from 'react'
import courseContext from '../context/CourseContext';

const AdminVideos = () => {
    const context = useContext(courseContext);
    let {adminCourse} = context;
    // console.log("ADMINADMIN: ", adminCourse );
    const [videos, setVideos] = useState([]);
    const [course, setCourse] = useState([]);
    const [dltVideo, setDltVideo] = useState({title: "", description: "", source: ""});

    const [newVideo, setNewVideo] = useState({courseID: adminCourse, title: "", description: "", source: ""});
    const ref = useRef(null);
    const refClose = useRef(null);
    const ref2 = useRef(null);
    const refClose2 = useRef(null);

    useEffect(() => {
        // if(adminCourse!==null){
        //     localStorage.setItem('adminCourseLS', adminCourse);
        //     console.log("Idhar to aya he hoga sala", adminCourse);
        // }
        // else{
        //     console.log('null h bhaiya');
        //     adminCourse = localStorage.getItem('adminCourseLS');
        //     console.log('here: ',adminCourse);
        // }
        // console.log("here1: ",adminCourse);


      console.log("success: ", adminCourse);
      console.log(context);
      fetch(`http://localhost:5000/api/getvideos`, {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json',
        },
            body: JSON.stringify({"courseID": adminCourse})
        })
        .then((response) => response.json())
        .then((dataa) => {
            console.log("Got the Videos: ");
            console.log(dataa);
            setVideos(dataa);
        })
        .catch((error) => {
            console.error('Error:', error);
        });

      fetch(`http://localhost:5000/api/getcourse`, {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json',
        },
            body: JSON.stringify({"courseID": adminCourse})
        })
        .then((response) => response.json())
        .then((dataa) => {
            console.log("Got the course: ");
            console.log(dataa);
            setCourse(dataa);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    
      
    }, [])
    const onChange = (e)=>{
        setNewVideo({...newVideo, [e.target.name]: e.target.value})
    }


    const handleDelete = (video)=>{

        //http://localhost:5000/api/auth/deletevideo
        setDltVideo(video);
        ref2.current.click();
    }

    const handleDltConfirm = (e)=>{
        e.preventDefault();
        fetch(`http://localhost:5000/api/auth/deletevideo`, {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token')
        },
            body: JSON.stringify({"videoID": dltVideo._id})
        })
        .then((response) => response.json())
        .then((dataa) => {
            console.log("Deleted successfully");
            // window.location.reload();
            ref2.current.click();
            alert("Video is successfully deleted. It will update the next time you visit this page");
        })
        .catch((error) => {
            console.error('Error:', error);
        });


    }

    const handleAddVideo = ()=>{
        ref.current.click();
    }

    const handleAddVideoModal = (e)=>{
        e.preventDefault();
        // console.log("YOYOYOO: ", newVideo);
        fetch(`http://localhost:5000/api/auth/uploadvideo`, {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify(newVideo),
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
        alert("Video added successfully. It will take time to show in here");  

        // window.location.reload();
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
                Add a new video
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
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    name="title"
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
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="source" className="form-label">
                    Source
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="source"
                    name="source"
                    onChange={onChange}
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
                onClick={handleAddVideoModal}
                type="button"
                className="btn btn-primary"
              >
                Add Video
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Modal for deleting video */}
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
              <h5>Name: {dltVideo.title}</h5>
              <h5>Description: {dltVideo.description}</h5>
              <h5>Source: <a target={"_blank"} href={dltVideo.source}>{dltVideo.source.substring(0,45)}......</a> </h5>
              
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


        <h2> {course.name}</h2>
        <h4>{course.description}</h4>
        <h4>Videos in this course: {course.totalVideos}</h4>
        <hr />

        <div>
    <h1 className='my-5'>Available Courses: </h1>
    <div className="text-center my-5">
        <button type="button" class="btn btn-primary btn-lg mx-3" onClick={()=>handleAddVideo()}>Add a new Video</button>
    </div>
    <div style={{overflowX : 'auto'}}>

    <table className="table table-hover ">
<thead>
<tr>
  <th scope="col">Title</th>
  <th scope="col">Description</th>
  <th scope="col">Source</th>
</tr>
</thead>
<tbody>
{
    videos.map((video)=>{
        
        return(<tr key={video._id}>
            <td>{video.title}</td>
            <td>{video.description}</td>
            <td>{ <a target={"_blank"} href={video.source}>{video.source}</a> }</td>
            
            <td><button className='btn btn-danger' onClick={()=>handleDelete(video)}>Delete Video</button></td>
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

export default AdminVideos